<div align="center">

# 🚀 Production-Ready Docker CI/CD Pipeline

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/mayur2410-tech/production-ready-docker-cicd/ci-cd.yaml?branch=main&logo=github&label=CI%2FCD)
![Docker Pulls](https://img.shields.io/docker/pulls/mayur2410/laundrybuddy-backend?logo=docker&label=Docker%20Pulls)
![GitHub repo size](https://img.shields.io/github/repo-size/mayur2410-tech/production-ready-docker-cicd)
![GitHub stars](https://img.shields.io/github/stars/mayur2410-tech/production-ready-docker-cicd?style=social)

[![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)](https://hub.docker.com/r/mayur2410/laundrybuddy-backend)
[![AWS](https://img.shields.io/badge/AWS-EC2-orange?logo=amazon-aws)](https://aws.amazon.com/ec2/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Automated-green?logo=github-actions)](https://github.com/features/actions)
[![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js)](https://nodejs.org/)

### Automated Deployment Pipeline for Laundry Buddy Backend

[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![DockerHub](https://img.shields.io/badge/DockerHub-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/)
[![AWS EC2](https://img.shields.io/badge/AWS%20EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/ec2/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

---

**A complete CI/CD pipeline using GitHub Actions, Docker, DockerHub, and AWS EC2 for automated deployments!**

[Features](#-key-features) • [Architecture](#%EF%B8%8F-architecture-flow) • [Setup](#-setup-guide) • [Tech Stack](#-tech-stack)

</div>

---
## 📌 Wrokflow Diagram

<img width="896" height="544" alt="diagram-export-1-29-2026-11_38_23-AM" src="https://github.com/mayur2410-tech/production-ready-docker-cicd/blob/main/ci-cd-workflow.png?raw=true" />

---

## 📌 Project Overview

This project demonstrates a **production-style CI/CD pipeline** for the Laundry Buddy backend. Whenever code is pushed to the `main` branch, it automatically runs tests, builds a Docker image, pushes to DockerHub, and deploys to AWS EC2 - all without manual intervention.

### 💡 The Problem This Solves

| Traditional Deployment ❌ | This Solution ✅ |
|--------------------------|------------------|
| Manual server SSH and deployment | Fully automated via GitHub Actions |
| "It works on my machine" syndrome | Consistent Docker images everywhere |
| Unreliable deployments | Tested code only reaches production |
| No version control for deployments | Every image tagged with commit SHA |
| Manual testing before deploy | Automated testing in CI pipeline |

---

## 🎯 Why This CI/CD Pipeline?

Manual deployment is slow and risky. This pipeline ensures:

- ✅ **Consistent deployments** (same Docker image everywhere)
- ✅ **Automation** (no manual server work after setup)
- ✅ **Reliability** (only tested code deploys)
- ✅ **Scalability** (works for any server that can pull Docker images)
- ✅ **Version control** (every image tagged with commit SHA)

---

## 🏗️ Architecture Flow

```mermaid
graph TD
    A[👨‍💻 Developer Push to main] -->|Triggers CI/CD| B[⚙️ GitHub Actions]
    B -->|Stage 1| C[🧪 Run Tests]
    C -->|Stage 2| D[🧹 Lint Code]
    D -->|Stage 3| E[🔐 Security Audit]
    E -->|Stage 4| F[🐳 Build Docker Image]
    F -->|Push to Registry| G[📦 DockerHub]
    G -->|Stage 5| H[☁️ Deploy to EC2]
    H -->|SSH & Pull| I[🚀 Live Application]
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#fff3e0
    style F fill:#e3f2fd
    style G fill:#f3e5f5
    style H fill:#fff8e1
    style I fill:#c8e6c9
```

**Complete Pipeline Flow:**

1. **Developer** pushes code to `main` branch
2. **GitHub Actions** triggers automatically
3. **CI Stage** - Run tests, lint, security audit
4. **Build Stage** - Create Docker image with two tags (latest + commit SHA)
5. **Push Stage** - Upload image to DockerHub registry
6. **Deploy Stage** - SSH to EC2, pull latest image, restart container
7. **Application** is live with zero downtime! 🎉

---

## 🧰 Tech Stack

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Backend Runtime | 22+ |
| **Docker** | Containerization | Latest |
| **DockerHub** | Image Registry | - |
| **GitHub Actions** | CI/CD Automation | - |
| **AWS EC2** | Production Server | Ubuntu 24 |
| **ESLint** | Code Quality | Latest |
| **npm audit** | Security Scanning | Built-in |

</div>

---

## ⚙️ CI/CD Pipeline Stages

### **Complete Automation Process**

```yaml
┌─────────────────────────────────────────────────────────┐
│ STAGE 1: Testing (CI)                                   │
│ • Checkout code                                         │
│ • Setup Node.js 22                                      │
│ • Cache dependencies                                    │
│ • Install dependencies (npm ci)                         │
│ • Run automated tests (npm test)                        │
└────────────────────┬────────────────────────────────────┘
                     │ ✅ Tests Pass
┌────────────────────▼────────────────────────────────────┐
│ STAGE 2: Linting (CI)                                   │
│ • Run ESLint checks                                     │
│ • Validate code quality                                 │
│ • Ensure coding standards                               │
└────────────────────┬────────────────────────────────────┘
                     │ ✅ Lint Pass
┌────────────────────▼────────────────────────────────────┐
│ STAGE 3: Security Scan (CI)                             │
│ • Run npm audit                                         │
│ • Check for high-severity vulnerabilities               │
│ • Validate dependencies                                 │
└────────────────────┬────────────────────────────────────┘
                     │ ✅ Security Pass
┌────────────────────▼────────────────────────────────────┐
│ STAGE 4: Build & Push Docker Image                      │
│ • Login to DockerHub                                    │
│ • Build Docker image                                    │
│ • Tag with 'latest' and commit SHA                      │
│ • Push to DockerHub registry                            │
│   → mayur2410/laundrybuddy-backend:latest               │
│   → mayur2410/laundrybuddy-backend:{commit-sha}         │
└────────────────────┬────────────────────────────────────┘
                     │ ✅ Image Built & Pushed
┌────────────────────▼────────────────────────────────────┐
│ STAGE 5: Deploy to EC2 (CD)                             │
│ • SSH into EC2 instance                                 │
│ • Pull latest Docker image                              │
│ • Stop old container                                    │
│ • Start new container                                   │
│ • Verify deployment                                     │
└────────────────────┬────────────────────────────────────┘
                     │
                ✅ LIVE ON EC2!
                Total Time: ~5-7 minutes
```

---

## 📂 Project Structure

```
production-ready-docker-cicd/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yaml          # Complete CI/CD workflow
│
├── Backend/
│   ├── Dockerfile              # Docker image configuration
│   ├── package.json            # Node.js dependencies
│   ├── package-lock.json       # Lock file for dependencies
│   ├── server.js               # Application entry point
│   ├── config/                 # Configuration files
│   ├── controllers/            # Route controllers
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   └── middleware/             # Custom middleware
│
└── README.md                   # Project documentation (you're here!)
```

---

## 🚀 Setup Guide

### **Prerequisites**

- ✅ AWS Account with EC2 instance running
- ✅ DockerHub account
- ✅ GitHub repository
- ✅ SSH key pair for EC2 access
- ✅ Basic knowledge of Docker, Git & AWS

---

### **1️⃣ EC2 Server Setup**

SSH into your EC2 instance and install Docker:

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group (no sudo needed)
sudo usermod -aG docker $USER

# Enable and start Docker
sudo systemctl enable docker
sudo systemctl start docker

# Verify installation
docker --version
```

Create deployment directory and environment file:

```bash
# Create deployment directory
mkdir -p ~/laundrybuddy-backend
cd ~/laundrybuddy-backend

# Create environment file
nano .env
```

Add your environment variables to `.env`:

```env
PORT=3000
MONGODB_URL=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key-here
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
FRONTEND_URL=https://your-frontend-url.com
```

⚠️ **Important:** Never commit `.env` to GitHub!

Create deployment script:

```bash
nano deploy.sh
```

Add this content:

```bash
#!/bin/bash

# Pull latest image from DockerHub
docker pull mayur2410/laundrybuddy-backend:latest

# Stop and remove old container
docker stop laundrybuddy-backend || true
docker rm laundrybuddy-backend || true

# Run new container
docker run -d \
  --name laundrybuddy-backend \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  mayur2410/laundrybuddy-backend:latest

# Show logs
docker logs -f laundrybuddy-backend
```

Make it executable:

```bash
chmod +x deploy.sh
```

Test manual deployment:

```bash
./deploy.sh
```

If you see the server running → EC2 setup is complete! 🚀

---

### **2️⃣ GitHub Secrets Configuration**

Navigate to: **Repository → Settings → Secrets and variables → Actions → New repository secret**

#### 🐳 DockerHub Secrets

| Secret Name | Value | How to Get |
|-------------|-------|------------|
| `DOCKERHUB_USERNAME` | mayur2410 | Your DockerHub username |
| `DOCKERHUB_TOKEN` | dckr_pat_xxxxx... | DockerHub → Account Settings → Security → New Access Token |

#### ☁️ AWS EC2 Secrets

| Secret Name | Value | How to Get |
|-------------|-------|------------|
| `EC2_HOST` | ec2-xx-xx-xx-xx.compute.amazonaws.com | EC2 Public IPv4 DNS or IP |
| `EC2_USERNAME` | ubuntu | Default user (ubuntu for Ubuntu AMI) |
| `EC2_SSH_KEY` | -----BEGIN RSA PRIVATE KEY-----... | Content of your .pem file |

**How to get EC2_SSH_KEY:**

```bash
# On your local machine
cat your-key.pem

# Copy entire content including:
# -----BEGIN RSA PRIVATE KEY-----
# ... (all lines)
# -----END RSA PRIVATE KEY-----
```

---

### **3️⃣ Docker Configuration**

Create `Dockerfile` in your `Backend/` directory:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

**What This Does:**

- ✅ Uses Node.js 22 Alpine (lightweight base image)
- ✅ Sets working directory to /app
- ✅ Copies dependency files first (layer caching optimization)
- ✅ Installs dependencies
- ✅ Copies application code
- ✅ Exposes port 3000
- ✅ Starts server with node server.js

---

### **4️⃣ GitHub Actions Workflow**

Create `.github/workflows/ci-cd.yaml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: Backend
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'npm'
          cache-dependency-path: Backend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test

  lint:
    needs: test
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: Backend
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint

  security:
    needs: [test, lint]
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: Backend
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run security audit
        run: npm audit --audit-level=high

  build_and_push:
    needs: [test, lint, security]
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: ./Backend
          push: true
          tags: |
            mayur2410/laundrybuddy-backend:latest
            mayur2410/laundrybuddy-backend:${{ github.sha }}

  deploy:
    needs: build_and_push
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/laundrybuddy-backend
            docker pull mayur2410/laundrybuddy-backend:latest
            docker stop laundrybuddy-backend || true
            docker rm laundrybuddy-backend || true
            docker run -d \
              --name laundrybuddy-backend \
              --restart unless-stopped \
              -p 3000:3000 \
              --env-file .env \
              mayur2410/laundrybuddy-backend:latest
            docker logs --tail 50 laundrybuddy-backend
```

---

### **5️⃣ Test Your Deployment**

```bash
# Make a change to your code
echo "// CI/CD pipeline test" >> Backend/server.js

# Commit and push
git add .
git commit -m "Test CI/CD pipeline"
git push origin main

# Watch GitHub Actions run automatically
# Visit: https://github.com/your-username/your-repo/actions
```

---

## ✅ Key Features

<div align="center">

| Feature | Benefit |
|---------|---------|
| 🧪 **Automated Testing** | Every push runs full test suite |
| 🧹 **Code Quality Checks** | ESLint ensures clean code |
| 🔐 **Security Scanning** | npm audit catches vulnerabilities |
| 🐳 **Docker Containerization** | Consistent environment everywhere |
| 📦 **Image Registry** | DockerHub stores all versions |
| 🏷️ **Version Tagging** | Latest + commit SHA for rollbacks |
| ⚡ **Zero Downtime** | Seamless container replacement |
| 🔄 **Automatic Deployment** | Push to main = live in 5-7 minutes |

</div>

---

## 🧰 Useful Commands

### 📊 On EC2 Instance

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View backend logs
docker logs laundrybuddy-backend

# Follow logs in real-time
docker logs -f laundrybuddy-backend

# View last 100 lines
docker logs --tail 100 laundrybuddy-backend

# Check container stats (CPU, Memory)
docker stats laundrybuddy-backend

# Restart container
docker restart laundrybuddy-backend

# Stop container
docker stop laundrybuddy-backend

# Remove container
docker rm laundrybuddy-backend

# View Docker images
docker images

# Remove unused images (cleanup)
docker image prune -af

# Remove all stopped containers
docker container prune -f
```

### 🔧 Manual Deployment

```bash
# If CI/CD fails, deploy manually:
cd ~/laundrybuddy-backend
./deploy.sh
```

### 🔄 Rollback to Previous Version

```bash
# Use specific commit SHA tag
docker pull mayur2410/laundrybuddy-backend:f6dcb3096fd2532f896bb438bc3172a096349886

docker stop laundrybuddy-backend
docker rm laundrybuddy-backend

docker run -d \
  --name laundrybuddy-backend \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  mayur2410/laundrybuddy-backend:f6dcb3096fd2532f896bb438bc3172a096349886
```

---

## 🐛 Troubleshooting

### **Common Issues & Solutions**

<details>
<summary><b>❌ Pipeline Failing at Test Stage</b></summary>

```bash
# Run tests locally
cd Backend/
npm install
npm test

# Check Node.js version
node --version  # Should be v22
```
</details>

<details>
<summary><b>❌ Pipeline Failing at Lint Stage</b></summary>

```bash
# Run lint locally
npm run lint

# Auto-fix issues
npx eslint . --fix
```
</details>

<details>
<summary><b>❌ Pipeline Failing at Security Stage</b></summary>

```bash
# Run audit locally
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may break things)
npm audit fix --force
```
</details>

<details>
<summary><b>❌ Docker Build Failing</b></summary>

```bash
# Build locally to debug
cd Backend/
docker build -t test-build .

# Check for syntax errors in Dockerfile
docker build --no-cache -t test-build .
```
</details>

<details>
<summary><b>❌ Cannot Push to DockerHub</b></summary>

**Check:**

- ✅ DOCKERHUB_USERNAME is correct
- ✅ DOCKERHUB_TOKEN is valid (regenerate if needed)
- ✅ Token has Read & Write permissions
</details>

<details>
<summary><b>❌ SSH Connection to EC2 Failing</b></summary>

**Check:**

- ✅ EC2_HOST is correct (public IP or DNS)
- ✅ EC2_USERNAME is correct (ubuntu or ec2-user)
- ✅ EC2_SSH_KEY includes entire .pem file content
- ✅ EC2 Security Group allows SSH (port 22) from GitHub IP ranges
- ✅ EC2 instance is running
</details>

<details>
<summary><b>❌ Container Not Starting on EC2</b></summary>

```bash
# Check Docker logs
docker logs laundrybuddy-backend

# Check if port 3000 is already in use
sudo netstat -tulpn | grep 3000

# Kill process using port 3000
sudo kill -9 <PID>

# Check disk space
df -h

# Check memory
free -m

# Restart Docker service
sudo systemctl restart docker
```
</details>

<details>
<summary><b>❌ Application Running but Not Accessible</b></summary>

**Check:**

- ✅ EC2 Security Group allows inbound traffic on port 3000
- ✅ MongoDB connection string is correct in .env
- ✅ All environment variables are set correctly

```bash
# Test locally on EC2
curl http://localhost:3000

# Should return: "Server is ready on EC2"
```
</details>

---

## 📊 Pipeline Metrics

| Stage | Average Time | Can Fail? |
|-------|-------------|-----------|
| **Test** | 45-60 sec | ✅ Yes |
| **Lint** | 20-30 sec | ✅ Yes |
| **Security** | 30-40 sec | ✅ Yes |
| **Build & Push** | 2-3 min | ✅ Yes |
| **Deploy** | 30-45 sec | ✅ Yes |
| **Total** | **~5-7 min** | |

---

## 🔐 Security Best Practices

This project implements production-grade security:

| Security Measure | Implementation |
|------------------|----------------|
| 🔑 **Environment Variables** | Stored in GitHub Secrets (never in code) |
| 🔒 **SSH Key Storage** | Encrypted in GitHub Secrets |
| 🛡️ **DockerHub Token** | Access token instead of password |
| 🔍 **Security Audits** | npm audit runs on every build |
| 🐧 **Alpine Linux** | Smaller attack surface |
| 🔄 **Container Restart Policy** | Ensures uptime and reliability |

---

## 🎓 What You'll Learn

By working with this project, you'll understand:

- ✅ How to build a complete CI/CD pipeline from scratch
- ✅ How to containerize Node.js applications with Docker
- ✅ How to write multi-stage GitHub Actions workflows
- ✅ How to push images to DockerHub registry
- ✅ How to deploy to AWS EC2 securely via SSH
- ✅ How to implement automated testing in CI/CD
- ✅ How to handle secrets and environment variables
- ✅ DevOps best practices for production deployments

---

## 🚀 Future Improvements

- [ ] **Health Checks** → Automatic rollback on deployment failure
- [ ] **Slack/Discord Notifications** → Build status alerts
- [ ] **Nginx Reverse Proxy** → HTTPS with SSL certificates
- [ ] **Staging Environment** → Test before production deployment
- [ ] **Blue-Green Deployment** → Zero-downtime updates
- [ ] **Database Backups** → Automated MongoDB backups
- [ ] **Monitoring** → Prometheus + Grafana dashboards
- [ ] **Log Aggregation** → ELK Stack (Elasticsearch, Logstash, Kibana)
- [ ] **Multi-Region Deployment** → High availability setup
- [ ] **Auto-Scaling** → Based on traffic patterns

---

## 📚 Resources & Documentation

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [Node.js Docker Guide](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [DockerHub Documentation](https://docs.docker.com/docker-hub/)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)

---

## 👨‍💻 Author

**Mayur**  
🎓 B.Tech Student | DevOps Enthusiast  
🐳 Docker • ⚙️ GitHub Actions • ☁️ AWS • 🧪 CI/CD

**GitHub:** [@mayur2410-tech](https://github.com/mayur2410-tech)

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

---

## ⭐ Show Your Support

If this project helped you understand CI/CD pipelines, please give it a **star!** ⭐

---

<div align="center">

**Made with ❤️ for learning DevOps**

</div>
