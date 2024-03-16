pipeline {
    agent any
    environment {
        // Define environment variables here
        VITE_APPWRITE_PROJECT_ID = credentials('VITE_APPWRITE_PROJECT_ID')
        VITE_APPWRITE_URL = credentials('VITE_APPWRITE_URL')
        VITE_APPWRITE_STORAGE_ID = credentials('VITE_APPWRITE_STORAGE_ID')
        VITE_APPWRITE_DATABASE_ID = credentials('VITE_APPWRITE_DATABASE_ID')
        VITE_APPWRITE_SAVES_COLLECTION_ID = credentials('VITE_APPWRITE_SAVES_COLLECTION_ID')
        VITE_APPWRITE_POSTS_COLLECTION_ID = credentials('VITE_APPWRITE_POSTS_COLLECTION_ID')
        VITE_APPWRITE_USERS_COLLECTION_ID = credentials('VITE_APPWRITE_USERS_COLLECTION_ID')
    }
    tools { nodejs 'node-16' }
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
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Log in to Docker Hub
                        sh "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
                        // Build and push Docker image, passing in build args for environment variables
                        sh '''
                        docker build -t my-react-app:latest . \
                        --build-arg VITE_APPWRITE_PROJECT_ID=$VITE_APPWRITE_PROJECT_ID \
                        --build-arg VITE_APPWRITE_URL=$VITE_APPWRITE_URL \
                        --build-arg VITE_APPWRITE_STORAGE_ID=$VITE_APPWRITE_STORAGE_ID \
                        --build-arg VITE_APPWRITE_DATABASE_ID=$VITE_APPWRITE_DATABASE_ID \
                        --build-arg VITE_APPWRITE_SAVES_COLLECTION_ID=$VITE_APPWRITE_SAVES_COLLECTION_ID \
                        --build-arg VITE_APPWRITE_POSTS_COLLECTION_ID=$VITE_APPWRITE_POSTS_COLLECTION_ID \
                        --build-arg VITE_APPWRITE_USERS_COLLECTION_ID=$VITE_APPWRITE_USERS_COLLECTION_ID
                        '''
                        // Push the Docker image to a registry
                        sh 'docker push thanamibk/my-react-app:latest'
                        // Deploy to Kubernetes
                        sh 'kubectl apply -f k8s-deployment.yaml'
                    }
                }
            }
        }
    }
}
