pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.build'
      dir 'build'
    }
  }
  options {
	skipStagesAfterUnstable()
  }
  stages {
    stage('test environment') {
      steps {
		sh 'npm --version && docker --version && docker-compose --version'
      }
    }
    stage('build') {
      steps {
        sh 'npm run docker-build'
      }
    }

    stage('deploy') {
      steps {
        sh 'npm run docker-deploy'
      }
    }
  }
  post {
  	  always {
  	    echo 'build finished'
  	  }
  	  success {
  		echo 'was stable'
  	  }
  	  unstable {
  	    echo 'had failures'
  	  }
  	}
}