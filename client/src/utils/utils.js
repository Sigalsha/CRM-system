class Utils {
  getClientProperty = (property, clients) => {
    return clients.map((c) => c[property]);
  };

  reduceDuplications = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  };

  findClientIndex = (clients, client) => {
    for (let i in clients) {
      if (clients[i].client === client) {
        return i;
      }
    }
  };

  findClientIndexById = (clients, id) => {
    for (let i in clients) {
      if (clients[i]._id === id) {
        return i;
      }
    }
    return false;
  };

  isFrom2018 = (startYear, isBefore) => {
    let year = startYear.slice(0, 4);
    if (isBefore) {
      return year < 2018;
    } else {
      return year >= 2018;
    }
  };

  filterSalesByYear = (firstContactDate, year) => {
    return firstContactDate.slice(0, 4) === year;
  };

  getSales = (clientsToFilter, isSold) => {
    return clientsToFilter.filter((c) => c.sold === isSold);
  };

  getSalesByProperty = (key, clientsToFilter) => {
    return this.getClientProperty(key, utils.getSales(clientsToFilter, true));
  };

  countSalesByKey = (sales) => {
    return sales.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});
  };

  getTopSalesByKey = (sales) => {
    let salesCounts = this.countSalesByKey(sales);
    let maxCount = Math.max(...Object.values(salesCounts));
    let mostFrequent = Object.keys(salesCounts).filter(
      (k) => salesCounts[k] === maxCount
    );
    return mostFrequent;
  };

  getSalesByMonth = (sales, month) => {
    const fixedDates = sales.map((sale) => {
      return new Date(sale.firstContact);
    });
    const filteredByMonth = fixedDates.filter((d) => d.getMonth() === month);
    return filteredByMonth.length;
  };

  isMinLength = (value) => {
    const minReg = /( *?[0-9a-zA-Z] *?){3,}/;
    return minReg.test(value);
  };

  isEmailValid = (email) => {
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailReg.test(email);
  };
}

let utils = new Utils();

export default utils;
