# Deploy Server to Vercel - Complete Guide

## ✅ Files Added for Vercel

1. **`vercel.json`** - Vercel configuration
2. **`api/index.js`** - Entry point for Vercel serverless functions
3. **Updated `server.js`** - Export app for Vercel

## 🚀 Deployment Steps

### Step 1: Push Changes to GitHub

```bash
git add .
git commit -m "Configure server for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your **server repository**
4. Vercel will auto-detect the configuration

### Step 3: Configure Environment Variables

In Vercel dashboard, add these environment variables:

#### Required Variables:

```env
MONGODB_URI=mongodb+srv://caruser:car1234@cluster0.p3pm3nq.mongodb.net/car-rental?retryWrites=true&w=majority

FIREBASE_PROJECT_ID=car10-8d521

FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEQwYhNCogjPzz
A9vmTlBl0up/XPMu43B2vwCehvIY1uEXeHNvbTLC4vE2JGIpC2Q97dnbbS0LgpYt
R4zSQXSCxXBLRrkS+XzJX2MkmwnvUyAAJbXt5XxT6cXJjTf6jwgnElTZUKeIqH+3
lW38SOyP4j1nS4CEKd/Sl/f9DkIXKLKkt39JyHvkM0qJryf9z8UwNZK5xhNvieT0
SXunpLM0FUC3IMy81mVgXDaqfXZuNWEJ5fsP6vl7auTfK6O79JsSywzANrC/hiOo
sS7YsupG/+qNti/XaQ+4iPwF/hG7Fy10uwNKJPZqx7+/AlklavE6EYG3n5+ipIdG
W8vEIJDBAgMBAAECggEAFMBGxE6mVaK9QVnwb5LANW6Y6gvYj+XvB4nSdZssZdad
Hhos5Q8qsChxUJmFjMluOTi43CvYThXp7bJZqrF5Bt/8AOQ4FVAuaCxJvfPBQn4L
gs3PRUQKYo+edge/GiLyvbmBIdPBTasN4J9QGGiteoPKnO1YEqFKz715tFaZmPu+
ZIGlxqwlebCiPTjQBLFC2vXij8DeHxoFSLnBeg3VyL4lQijTW9jIOWQhHIFTZpfA
Y/KyHjjIicCU1IzhD3wUjALkVIVyozDkw3q7lRyjSEh27S/J/9ODE5HQVVhODcvM
waJHjq++h1sW3tEPRbzgRN19V71ExJMVpeiy0YBrsQKBgQDy9/3otSiGgqkxONG5
Odg58rTwkp9zO77cb9W7M28Ckev/lQWyTMUP11kqp2bXqJEyc6aHGsVdD5h4rgeR
JMp6k1mJOkgmSpm0eM3f6jUaB2MN4f+A6cACCNAQNdKq7EY7HsHUEsDGDT7AvqPl
mMiRpKGT8bOMsVUQtZ5cxukM6wKBgQDOyby0qoX+U92xwPbzzueNJzXAohLaVEyF
fCmu4Bzei9luC9y7+6m9SxR9oStpOvVyrJiVw8fRbczcBIwlo+4Hkb1DA+udysAa
TLkgu3NnvFiqzwfX4IBn6faMSAr2RYL5OnkdpPg3lyhqREzJ5Vg2omBt2dMt6vYf
lhJg962+AwKBgAJdg61GRjS5BOijwvbop0A5KqXE56R5imwe8pe18ni17vQ4ASwx
LyHuWMHfi1LCI1e4ZICgNBep1TQnjY9OKmJzGMYLOTSWOVTWcDqjzwyH0eEKuDAL
FoFukIf33isnza85p21nGVVUP64krPfJOvqf/aqxCaxu9YMKIZaJoS8tAoGAKvct
t1grCSIB0Ton1Zaq8+Auwfyq8CRN1fprasN0HCVwovXiAkkTBprAAi5np7CxaQdF
mPCZ5wDqbNihCf0aqwX0DiWVYi7LZWuFl7B7FRXEUpE7rvYdl/m72X/qjyr4QLKO
kcNCM8K7igDw944omwl4Absdrs/AHeX/oZg0yGMCgYEAqa1RGa1jtGEMDGEuf5wm
tn5CoiQBK29rzwyHzVDNmmmPYB8MiwvetPTBNKiFLWTWlvq/YTXBNIiKH/UT/GdM
DmKfWQ17Wz5yAlM8SattxlRGlvyiK9ByWr3QyZGO89uf1km8rqAT6bkj7pTyIO46
VeawFLWzI4qN6k0QLkGgLYA=
-----END PRIVATE KEY-----

FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@car10-8d521.iam.gserviceaccount.com

CLIENT_URL=http://localhost:5173

NODE_ENV=production
```

**Important Notes:**
- For `FIREBASE_PRIVATE_KEY`, paste the entire key including BEGIN and END lines
- Keep the line breaks (Vercel handles them automatically)
- Update `CLIENT_URL` after deploying your frontend

### Step 4: Deploy

Click **"Deploy"** and wait for the build to complete.

## 🔧 After Deployment

### 1. Get Your API URL

After deployment, you'll get a URL like:
```
https://your-server-app.vercel.app
```

### 2. Test Your API

Open in browser:
```
https://your-server-app.vercel.app/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 3. Test Cars Endpoint

```
https://your-server-app.vercel.app/api/cars
```

Should return your car listings!

### 4. Update Client Environment Variable

In your **client** Vercel project:

Update `VITE_API_URL` to:
```
https://your-server-app.vercel.app/api
```

### 5. Update CORS

Go back to your server Vercel project:

Update `CLIENT_URL` environment variable to your client URL:
```
https://your-client-app.vercel.app
```

Then redeploy the server.

## 🐛 Troubleshooting

### Issue: 500 Internal Server Error

**Check Vercel Logs:**
1. Go to your Vercel project
2. Click on the deployment
3. Click "Functions" tab
4. Check the logs for errors

**Common Causes:**
- Missing environment variables
- MongoDB connection issues
- Firebase credentials incorrect

### Issue: MongoDB Connection Timeout

**Solution:**
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Use `0.0.0.0/0` (allow all) for testing
4. Or add Vercel's IP ranges

### Issue: CORS Error

**Solution:**
Update `CLIENT_URL` environment variable in Vercel to include your frontend URL.

### Issue: Firebase Authentication Error

**Solution:**
- Verify `FIREBASE_PRIVATE_KEY` includes line breaks
- Check `FIREBASE_PROJECT_ID` matches your Firebase project
- Verify `FIREBASE_CLIENT_EMAIL` is correct

## ✅ Verification Checklist

- [ ] Server deployed to Vercel
- [ ] Environment variables added
- [ ] `/api/health` endpoint works
- [ ] `/api/cars` returns data
- [ ] MongoDB connection successful
- [ ] Firebase authentication working
- [ ] CORS configured for frontend
- [ ] Client updated with server URL

## 📊 Vercel Limits (Free Tier)

- **Serverless Function Execution:** 100 GB-hours/month
- **Bandwidth:** 100 GB/month
- **Invocations:** 100,000/month
- **Function Duration:** 10 seconds max

Perfect for development and small projects!

## 🎉 Success!

Your backend is now deployed on Vercel! 

**API Base URL:** `https://your-server-app.vercel.app/api`

Use this URL in your frontend's `VITE_API_URL` environment variable.
