<template>
  <div class="container">
    

    <div class="window">
      <button class="back-button" @click="goBack">
      ←
    </button>
      <div class="login-section">
        <div class="login-form">
          <h1>Iniciar sesión</h1>
          <input v-model="email" type="email" placeholder="Introduce tu email" class="input-field" />
          <input v-model="password" type="password" placeholder="Introduce tu contraseña" class="input-field" />
          <button @click="handleLogin" class="login-button">Iniciar sesión</button>
        </div>
      </div>

      <div class="image-section">
        <img src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png" alt="Logo" class="image" />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  setup() {
    const router = useRouter();
    const handleLogin = () => {
      router.push('/trabajadores');
    };

    const goBack = () => {
      router.push('/');
    };

    return {
      handleLogin,
      goBack,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(0,83,123);
  background: radial-gradient(circle, rgba(0,83,123,1) 0%, rgba(0,33,86,1) 35%);
  position: relative;
}

.window {
  display: flex;
  width: 90vw;
  max-width: 1500px;
  height: 80vh;
  max-height: 1200px;
  position: relative;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.719);
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.back-button:hover {
  color: #007bff;
}

.login-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.575);
  border-radius: 15px 0 0 15px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.input-field {
  width: 100%;
  max-width: 300px;
  padding: 12px 20px;
  margin-bottom: 20px;
  border: 2px solid #444;
  border-radius: 25px;
  font-size: 16px;
  background: #fff;
  color: #333;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.login-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(5,172,233);
  background: linear-gradient(142deg, rgba(5,172,233,1) 0%, rgba(0,33,86,1) 57%);
  border-radius: 0 15px 15px 0;
}

.image {
  width: 50%;
  height: auto;
}

@media (max-width: 768px) {
  .input-field {
    max-width: 80%;
    font-size: 14px;
  }

  .login-button {
    padding: 10px 20px;
    font-size: 14px;
  }

  .image {
    width: 60%;
  }
}

@media (max-width: 480px) {
  .input-field {
    max-width: 90%;
    font-size: 12px;
  }

  .login-button {
    padding: 8px 16px;
    font-size: 12px;
  }

  .image {
    width: 70%;
  }
}
</style>
