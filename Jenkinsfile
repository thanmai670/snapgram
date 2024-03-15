pipeline {
    agent any
    stages {
        stage('Install and Build') {
            steps {
                script {
                    docker.image('node:16-alpine').inside {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Use withCredentials to securely inject the username and password
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Log in to Docker Hub
                        sh "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
                        // Assuming you have a Dockerfile, build your Docker image
                        sh 'docker build -t my-react-app:latest .'
                        // Push the Docker image to a registry (Docker Hub, for instance)
                        sh 'docker push thanamibk/my-react-app:latest'
                        // Deploy to Kubernetes
                        sh 'kubectl apply -f k8s-deployment.yaml'
                    }
                }
            }
        }
    }
}
