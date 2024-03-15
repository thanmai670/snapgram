pipeline {
    agent any
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
                    // Assuming you have a Dockerfile, build your Docker image
                    sh 'docker build -t my-react-app:latest .'
                    // Push the Docker image to a registry (Docker Hub, for instance)
                    sh 'docker push thanmaibk/my-react-app:latest'
                    // Deploy to Kubernetes
                    sh 'kubectl apply -f k8s-deployment.yaml'
                }
            }
        }
    }
}
