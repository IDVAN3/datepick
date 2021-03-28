
'use strict'
$(document).ready(function () {

      /*=== NATIVE DATERANGEPICKER ===*/
  const date_picker_element = document.querySelector('.date-picker');
  const selected_date_element = document.querySelector('.date-picker .selected-date');
  const dates_element = document.querySelector('.date-picker .dates');
  const mth_element = document.querySelector('.date-picker .dates .month .mth');
  const mth_element_two = document.querySelector('.date-picker .dates .month .mth-two');
  const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
  const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
  const week_element = document.querySelector('.week');
  const week_element2 = document.querySelector('.week-2');

  const days_element = document.querySelector('.date-picker .dates .days');
  const days_element_two = document.querySelector('.date-picker .dates .days-two');

  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const monthsRename = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let monthToday = date.getMonth();
  let year = date.getFullYear();
  let year2 = date.getFullYear();
  let yearToday = date.getFullYear();

  let selectedDate = date;
  let selectedDay = day;
  let selectedMonth = month;
  let selectedYear = year;
  let monthPlus = month + 1;
  

  mth_element.textContent = months[month] + ' ' + year;
  mth_element_two.textContent = months[month + 1] + ' ' + year2;

  // selected_date_element.textContent = formatDate(date);
  selected_date_element.dataset.value = selectedDate;

  populateDates();
  populateWeek();

  const prev_mth_element_false = document.querySelector('.date-picker .dates .month .false');

  // EVENT LISTENERS
  date_picker_element.addEventListener('click', toggleDatePicker);
  next_mth_element.addEventListener('click', goToNextMonth);
  

  if(prev_mth_element_false) {
    prev_mth_element_false.addEventListener('click', falsePrevMonth);
  }
  else {
    prev_mth_element.addEventListener('click', goToPrevMonth);
  }
  

  // FUNCTIONS
  function toggleDatePicker (e) {
    if (!checkEventPathForClass(e.path, 'dates')) {
      dates_element.classList.toggle('active');
    }
    
  }

  function goToNextMonth(e) {
    e.preventDefault();
    
    month++;
    monthPlus++;
    if (month > 11) {
      month = 0;
      year++;
    }
    if (monthPlus > 11) {
      monthPlus = 0;
      year2++;
    }
    mth_element.textContent = months[month] + ' ' + year;
    mth_element_two.textContent = months[monthPlus] + ' ' + year2;
    populateDates();

    prev_mth_element.addEventListener('click', goToPrevMonth);
    
  }

  function goToPrevMonth(e) {
    e.preventDefault();
    
    
    if(prev_mth_element_false.classList.contains('false')){
      prev_mth_element_false.addEventListener('click', falsePrevMonth);
    }
    else {
      month--;
      monthPlus--;
    if (month < 0) {
      month = 11;
      year--;
    }
    if (monthPlus < 0) {
      monthPlus = 11;
      year2--;
    }
    mth_element.textContent = months[month] + ' ' + year;
    mth_element_two.textContent = months[monthPlus] + ' ' + year2;
    populateDates();
    }

  }

  function falsePrevMonth(e) {
    e.preventDefault();
    
    return false;
  }

  function populateWeek(e) {
    for(let i = 0; i < 7; i++) {
      
      const week_elem = document.createElement('div');
      week_elem.classList.add('week-day');
      week_elem.textContent = week[i];
      week_element.appendChild(week_elem);
      
    }
    $('.week').clone().appendTo(".week-all");
  }

  function populateDates(e) {
    days_element.innerHTML = '';
    days_element_two.innerHTML = ''
    let amount_days = 31;
    let amount_days_two = 31;
    
    if(month == 1) {
      amount_days = 28;
      if(year % 4 == 0) {
        amount_days = 29;
      }
    }
    else if(month == 3 || month == 5 || month == 8 || month == 10) {
      amount_days = 30;
    }
    if(monthPlus == 1) {
      amount_days_two = 28;
      if(year % 4 == 0) {
        amount_days_two = 29;
      }
    }
    else if(monthPlus == 3 || monthPlus == 5 || monthPlus == 8 || monthPlus == 10) {
      amount_days_two = 30;
    }
    let selectedWeekDay = new Date(year + '-' + (month + 1) + '-' + 1);
    let getSelectedWeekDay = getLocalDay(selectedWeekDay);
    let selectedWeekDay_two = new Date(year + '-' + (monthPlus + 1) + '-' + 1);
    let getSelectedWeekDay_two = getLocalDay(selectedWeekDay_two);
    
    for (let i = 1; i < getSelectedWeekDay; i++) {
      const day_element = document.createElement('div');
      days_element.appendChild(day_element);
    }

    for (let i = 1; i < getSelectedWeekDay_two; i++) {
      const day_element_two = document.createElement('div');
      days_element_two.appendChild(day_element_two);
    }
    
    for (let i = 0; i < amount_days; i++) {
      
      const day_element = document.createElement('div');
      day_element.classList.add('day');
      if (i + 1 < day && year == yearToday && month == monthToday) {
        day_element.classList.add('disabled');
        prev_mth_element.classList.add('false');
        
      }
      else if (year < yearToday) {
        day_element.classList.add('disabled');
        prev_mth_element.classList.add('false');
      }
      // else if (month < monthToday) {
      //   day_element.classList.add('disabled');
      //   prev_mth_element.classList.add('false');
      // }
      else if (month > monthToday) {
        prev_mth_element.classList.remove('false');
      }
      day_element.textContent = i + 1;

      if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month && !(day_element.classList.contains('disabled'))) {
        day_element.classList.add('selected');
      }
      if (!(day_element.classList.contains('disabled'))) {
        day_element.addEventListener('click', function () {
          selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
          selectedDay = (i + 1);
          selectedMonth = month;
          selectedYear = year;
  
          selected_date_element.textContent = formatDate(selectedDate);
          selected_date_element.dataset.value = selectedDate;
  
          populateDates();
        })
      }
      

      days_element.appendChild(day_element);
      
    }

    for (let i = 0; i < amount_days_two; i++) {
      const day_element_two = document.createElement('div');
      day_element_two.classList.add('day');
      day_element_two.textContent = i + 1;
      if (selectedDay == (i + 1) && selectedYear == year2 && selectedMonth == monthPlus && !(day_element_two.classList.contains('disabled'))) {
        day_element_two.classList.add('selected');
      }
      
      if (!(day_element_two.classList.contains('disabled'))) {
        day_element_two.addEventListener('click', function () {
          selectedDate = new Date(year2 + '-' + (monthPlus + 1) + '-' + (i + 1));
          selectedDay = (i + 1);
          selectedMonth = monthPlus;
          selectedYear = year2;
  
          selected_date_element.textContent = formatDate(selectedDate);
          selected_date_element.dataset.value = selectedDate;
  
          populateDates();
        })
      }

      days_element_two.appendChild(day_element_two);
    }
  }

  // HELPER FUNCTION 
  function getLocalDay(date) {

    let day = date.getDay();
  
    if (day == 0) { 
      day = 7;
    }
  
    return day;
  }

  function checkEventPathForClass (path, selector) {
    for (let i = 0; i < path.length; i++) {
      if (path[i].classList && path[i].classList.contains(selector)) {
        return true;
      }
    }
    
    return false;
  }

  function formatDate (d) {
    let day = d.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let month = d.getMonth();
    
    let year = d.getFullYear();

    return day + ' ' + monthsRename[month] + ' ' + year;
  }

  /*=== /NATIVE DATERANGEPICKER ===*/

});
