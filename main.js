const button = document.getElementById('getstarted');
const navigate = (path) => {
  document.location.href = path;
};

button.addEventListener('click', () => {
  navigate('/todolist');
});


