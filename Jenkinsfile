pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Log in to Docker Hub
                    sh "echo \$DOCKER_PASSWORD | docker login --username \$DOCKER_USERNAME --password-stdin"
                    // Assuming you have a Dockerfile, build your Docker image
                    sh 'docker build -t my-react-app:latest .'
                    // Push the Docker image to a registry (Docker Hub, for instance)
                    sh 'docker push myusername/my-react-app:latest'
                    // Deploy to Kubernetes
                    sh 'kubectl apply -f k8s-deployment.yaml'
                }
            }
        }
    }
    environment {
        DOCKER_USERNAME = credentials('${DOCKER_CREDENTIALS_ID}').username
        DOCKER_PASSWORD = credentials('${DOCKER_CREDENTIALS_ID}').password
    }
}
