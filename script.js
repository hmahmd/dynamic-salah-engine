let btn = document.querySelector(`button`);

btn.addEventListener('click', function (event) {
  event.preventDefault();

  let cityInput = document.querySelector(`#cityInput`).value.trim();
  let countryInput = document.querySelector(`#countryInput`).value.trim();
  let result = document.querySelector(`#result`);

  if (cityInput == '' || countryInput == '' || cityInput.length < 3 || countryInput.length < 3) {
    result.innerHTML = '<p style="color: #e74c3c; text-align: center; font-weight: bold;">⚠️ Please enter valid names (minimum 3 characters)</p>';
    return;
  }

  let URL = `https://api.aladhan.com/v1/timingsByCity/31-01-2026?city=${cityInput}&country=${countryInput}&method=1`;

  result.innerHTML = '<p style="text-align: center; color: #667eea; font-size: 18px;">⏳ Loading...</p>';

  fetch(URL)
    .then(function (rawResponse) {

      if (!rawResponse.ok) {
        throw new Error('Network response was not ok');
      }
      return rawResponse.json();
    })
    .then(function (res) {
      console.log('res', res);

      if (res.code !== 200 || !res.data || !res.data.timings) {
        result.innerHTML = '<p style="color: #e74c3c; text-align: center; font-weight: bold; font-size: 16px;">❌ City not found! Please check spelling.</p>';
        return;
      }

      let timing = res.data.timings;
      let timezone = res.data.meta.timezone;

      result.innerHTML = `
        <h2 id="timezone-heading">📍 ${timezone}</h2>
        <p><strong>Fajr:</strong> ${timing.Fajr}</p>
        <p><strong>Dhuhr:</strong> ${timing.Dhuhr}</p>
        <p><strong>Asr:</strong> ${timing.Asr}</p>
        <p><strong>Maghrib:</strong> ${timing.Maghrib}</p>
        <p><strong>Isha:</strong> ${timing.Isha}</p>
      `;
    })
    .catch(function (error) {
      console.log('error', error);
      result.innerHTML = '<p style="color: #e74c3c; text-align: center; font-weight: bold; font-size: 16px;">❌ Network error! Please check your internet connection.</p>';
    })
})