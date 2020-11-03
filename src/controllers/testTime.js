const mongoose = require('mongoose');
const Tables = require('../models/table.model');

const checkTime = (item) => {
    item = item.split(':');
    return (+item[0]*60) + +item[1];
};


const check = async () => {

  const tables = await Tables.find();
  const dateNow = new Date();

  const formatDate = () => { // ФОРМАТ ДАТЫ 2020-10-31

    let day = dateNow.getDate();
    if (day < 10) day = '0' + day;

    let mounth = dateNow.getMonth() + 1;
    if (mounth < 10) mounth = '0' + mounth;

    let year = dateNow.getFullYear();
    if (year < 10) year = '0' + year;

    return year + '-' + mounth + '-' + day;

  }

  const formatTime = () => { // ФОРМАТ ВРЕМЕНИ 23:00
    let hours = dateNow.getHours();
    let min = dateNow.getMinutes();
    return hours + ":" + min;
  };

  let time = formatTime();
  let date = formatDate();
  const beforTime = 180;
  const waitTime = 10; // УКАЗАТЬ ВРЕМЯ ОЖИДАНИЯ В МИНУТАХ!

  tables.forEach(async (el) => {
    if(el.status === 'block' && el.armed.length === 0){
      const update = await Tables.updateOne(el, { status: 'free' });
    };
      el.armed.forEach(async (item) => {
      if(item.date === date && checkTime(formatTime(time)) >= checkTime(item.time) - beforTime){
            const update = await Tables.updateOne(el, { status: 'block' });
      } else if  (item.date === date && checkTime(formatTime(time)) >= checkTime(item.time) + waitTime) {
        const update = await Tables.updateOne(el, { status: 'free',$pull: { armed: item } });
      };
    })
    // Если совпадает дата, время больше ожидаемого, стол забронирован
  });
};






module.exports = check
