import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

// Read firebase applet config for server-side auth & firestore verification
let fileConfig: any = {};
try {
  const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
} catch (e) {
  console.warn('Could not load firebase-applet-config.json on server:', e);
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || fileConfig.apiKey,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN || fileConfig.authDomain,
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || fileConfig.projectId,
  firestoreDatabaseId: process.env.FIREBASE_DATABASE_ID || process.env.VITE_FIREBASE_DATABASE_ID || fileConfig.firestoreDatabaseId || 'ai-studio-trltokhochbidymt-6d8f795c-20e8-42b4-b455-af077ee7b386',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET || fileConfig.storageBucket,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fileConfig.messagingSenderId,
  appId: process.env.FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID || fileConfig.appId,
};

const DEFAULT_ADMIN_EMAILS = [
  'hoi.mythuatbs2@gmail.com',
  'ducphuc209219@gmail.com',
  'nguyenhoi.education@gmail.com',
  'animizht1208@gmail.com'
];

const envAdminEmails = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  : [];

const ADMIN_EMAILS = Array.from(new Set([
  ...DEFAULT_ADMIN_EMAILS.map(e => e.toLowerCase()),
  ...envAdminEmails
]));

const INITIAL_ALLOWED_EMAILS = [
  'nguyenhoi.it@gmail.com',
  'mithuat.cungchiase@gmail.com',
  ...ADMIN_EMAILS
];

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS for Vercel preview domains & cross-origin requests
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (_req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const apiRouter = express.Router();

// API routes FIRST
apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Verify user authorization server-side
// Checks if user's Google email exists and is active in the Firestore 'allowed_users' collection
apiRouter.post('/auth/verify-allowed-user', async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
      const idToken = req.body?.idToken || bearerToken;

      if (!idToken || typeof idToken !== 'string') {
        return res.status(401).json({
          allowed: false,
          error: 'Thiếu mã xác thực (idToken) từ Google/Firebase.'
        });
      }

      // 1. Verify token with Firebase / Google Identity Toolkit API
      const apiKey = firebaseConfig.apiKey || process.env.VITE_FIREBASE_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          allowed: false,
          error: 'Chưa cấu hình Firebase API Key trên máy chủ.'
        });
      }

      const lookupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;
      const lookupRes = await fetch(lookupUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      if (!lookupRes.ok) {
        return res.status(401).json({
          allowed: false,
          error: 'Phiên đăng nhập Google không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.'
        });
      }

      const userData = await lookupRes.json();
      const verifiedEmail = userData.users?.[0]?.email?.toLowerCase().trim();

      if (!verifiedEmail) {
        return res.status(400).json({
          allowed: false,
          error: 'Không tìm thấy địa chỉ email trong thông tin xác thực Google.'
        });
      }

      // 2. Query the allowed_users collection in Firestore on the server
      const projectId = firebaseConfig.projectId;
      const databaseId = firebaseConfig.firestoreDatabaseId;

      if (!projectId || !databaseId) {
        // Fallback: check against hardcoded initial list if config missing
        const isAllowedInitial = INITIAL_ALLOWED_EMAILS.includes(verifiedEmail);
        if (isAllowedInitial) {
          return res.json({
            allowed: true,
            email: verifiedEmail,
            role: 'teacher',
            status: 'active',
            message: 'Email được cấp phép qua danh sách hệ thống.'
          });
        }
        return res.status(403).json({
          allowed: false,
          email: verifiedEmail,
          error: `Email ${verifiedEmail} không nằm trong danh sách được phép sử dụng ứng dụng.`
        });
      }

      const firestoreDocUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/allowed_users/${encodeURIComponent(verifiedEmail)}`;
      
      const firestoreRes = await fetch(firestoreDocUrl, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (firestoreRes.ok) {
        const docData = await firestoreRes.json();
        const status = docData.fields?.status?.stringValue || 'active';

        if (status === 'inactive') {
          return res.status(403).json({
            allowed: false,
            email: verifiedEmail,
            error: `Tài khoản ${verifiedEmail} hiện đang ở trạng thái tạm khóa trong bảng allowed_users.`
          });
        }

        const isAdmin = ADMIN_EMAILS.includes(verifiedEmail) || docData.fields?.role?.stringValue === 'admin';
        return res.json({
          allowed: true,
          email: verifiedEmail,
          isAdmin,
          role: docData.fields?.role?.stringValue || (isAdmin ? 'admin' : 'teacher'),
          status,
          message: `Xác thực máy chủ thành công: Email ${verifiedEmail} có trong bảng allowed_users.`
        });
      }

      // Fallback check for initial system emails if doc was not yet retrieved
      if (INITIAL_ALLOWED_EMAILS.includes(verifiedEmail)) {
        const isAdmin = ADMIN_EMAILS.includes(verifiedEmail);
        const assignedRole = isAdmin ? 'admin' : 'teacher';
        // Auto-seed this record into Firestore allowed_users
        fetch(firestoreDocUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify({
            fields: {
              email: { stringValue: verifiedEmail },
              role: { stringValue: assignedRole },
              status: { stringValue: 'active' },
              note: { stringValue: isAdmin ? 'Quản trị viên hệ thống' : 'Khởi tạo tự động bởi máy chủ' },
              createdAt: { stringValue: new Date().toISOString() }
            }
          })
        }).catch(() => {});

        return res.json({
          allowed: true,
          email: verifiedEmail,
          isAdmin,
          role: assignedRole,
          status: 'active',
          message: isAdmin 
            ? `Tài khoản ${verifiedEmail} là Quản trị viên hệ thống (Admin).`
            : `Email ${verifiedEmail} thuộc danh sách giáo viên khởi tạo mặc định.`
        });
      }

      // If document was not found (404) and not in initial list, reject immediately!
      console.warn(`[Server Auth] Từ chối truy cập cho email không nằm trong allowed_users: ${verifiedEmail}`);
      return res.status(403).json({
        allowed: false,
        email: verifiedEmail,
        error: `Tài khoản Google "${verifiedEmail}" không nằm trong bảng allowed_users. Bạn không có quyền truy cập ứng dụng này.`
      });

    } catch (error: any) {
      console.error('Lỗi xác thực allowed_users trên server:', error);
      return res.status(500).json({
        allowed: false,
        error: `Lỗi máy chủ khi kiểm tra quyền truy cập: ${error.message}`
      });
    }
  });

  // Middleware helper to verify caller is in ADMIN_EMAILS
  async function verifyAdminCaller(req: express.Request): Promise<{ isAdmin: boolean; email?: string; error?: string }> {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
    const idToken = req.body?.idToken || bearerToken;

    if (!idToken) {
      return { isAdmin: false, error: 'Thiếu mã xác thực (idToken).' };
    }

    const apiKey = firebaseConfig.apiKey || process.env.VITE_FIREBASE_API_KEY;
    if (!apiKey) {
      return { isAdmin: false, error: 'Chưa cấu hình Firebase API Key.' };
    }

    try {
      const lookupRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      if (!lookupRes.ok) {
        return { isAdmin: false, error: 'Token không hợp lệ hoặc đã hết hạn.' };
      }

      const userData = await lookupRes.json();
      const verifiedEmail = userData.users?.[0]?.email?.toLowerCase().trim();

      if (!verifiedEmail) {
        return { isAdmin: false, error: 'Không tìm thấy email của tài khoản.' };
      }

      if (!ADMIN_EMAILS.includes(verifiedEmail)) {
        return { isAdmin: false, email: verifiedEmail, error: `Tài khoản ${verifiedEmail} không có quyền Quản trị viên (Admin).` };
      }

      return { isAdmin: true, email: verifiedEmail };
    } catch (e: any) {
      return { isAdmin: false, error: e.message };
    }
  }

  // Admin endpoint: Add email to allowed_users
  apiRouter.post('/admin/add-allowed-user', async (req, res) => {
    const adminCheck = await verifyAdminCaller(req);
    if (!adminCheck.isAdmin) {
      return res.status(403).json({ success: false, error: adminCheck.error });
    }

    const { email, role, note } = req.body || {};
    const targetEmail = (email || '').trim().toLowerCase();

    if (!targetEmail || !targetEmail.includes('@')) {
      return res.status(400).json({ success: false, error: 'Địa chỉ email không hợp lệ.' });
    }

    const projectId = firebaseConfig.projectId;
    const databaseId = firebaseConfig.firestoreDatabaseId;

    try {
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
      const idToken = req.body?.idToken || bearerToken;

      const firestoreDocUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/allowed_users/${encodeURIComponent(targetEmail)}`;
      const patchRes = await fetch(firestoreDocUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          fields: {
            email: { stringValue: targetEmail },
            role: { stringValue: role || 'Giáo viên Mĩ thuật' },
            status: { stringValue: 'active' },
            note: { stringValue: note || `Thêm bởi Admin ${adminCheck.email}` },
            createdAt: { stringValue: new Date().toISOString() },
            updatedAt: { stringValue: new Date().toISOString() }
          }
        })
      });

      if (!patchRes.ok) {
        const errText = await patchRes.text();
        return res.status(500).json({ success: false, error: `Lỗi ghi Firestore: ${errText}` });
      }

      return res.json({ success: true, message: `Đã thêm ${targetEmail} vào bảng allowed_users thành công.` });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin endpoint: Remove email from allowed_users
  apiRouter.post('/admin/remove-allowed-user', async (req, res) => {
    const adminCheck = await verifyAdminCaller(req);
    if (!adminCheck.isAdmin) {
      return res.status(403).json({ success: false, error: adminCheck.error });
    }

    const { email } = req.body || {};
    const targetEmail = (email || '').trim().toLowerCase();

    if (!targetEmail) {
      return res.status(400).json({ success: false, error: 'Thiếu email cần xóa.' });
    }

    // Bảo vệ không xóa email admin
    if (ADMIN_EMAILS.includes(targetEmail)) {
      return res.status(400).json({ success: false, error: 'Không thể xóa email quản trị viên hệ thống!' });
    }

    const projectId = firebaseConfig.projectId;
    const databaseId = firebaseConfig.firestoreDatabaseId;

    try {
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
      const idToken = req.body?.idToken || bearerToken;

      const firestoreDocUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/allowed_users/${encodeURIComponent(targetEmail)}`;
      const delRes = await fetch(firestoreDocUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (!delRes.ok && delRes.status !== 404) {
        const errText = await delRes.text();
        return res.status(500).json({ success: false, error: `Lỗi xóa Firestore: ${errText}` });
      }

      return res.json({ success: true, message: `Đã xóa ${targetEmail} khỏi bảng allowed_users.` });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Verify template password endpoint
  // Compares client password strictly with secret TEMPLATE_PASSWORD
  apiRouter.post('/verify-template-password', (req, res) => {
    const { password } = req.body || {};
    const secretPassword = process.env.TEMPLATE_PASSWORD;

    if (!secretPassword) {
      return res.status(403).json({
        success: false,
        error: 'Chưa thiết lập secret TEMPLATE_PASSWORD trên máy chủ. Vui lòng thêm secret TEMPLATE_PASSWORD trong bảng cấu hình!'
      });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng nhập mật khẩu xác thực.'
      });
    }

    const trimmedInput = password.trim();
    if (trimmedInput === secretPassword.trim()) {
      return res.json({
        success: true,
        message: 'Mật khẩu chính xác! Cho phép thay đổi MASTER TEMPLATE (TUAN_01.pdf).'
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Mật khẩu không chính xác! Vui lòng kiểm tra lại.'
    });
  });

  // Mount API router on both /api and root
  // This guarantees compatibility with both direct requests and Vercel serverless rewrites
  app.use('/api', apiRouter);
  app.use(apiRouter);

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// In local dev and Docker / Cloud Run containers, start HTTP server on PORT 3000
// On Vercel, Vercel Serverless Function imports and manages app directly
if (!process.env.VERCEL) {
  startServer();
}

export default app;
export { app };
