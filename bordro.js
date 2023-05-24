const btnOk = document.querySelector(".btn-input");
const payment = document.querySelector(".info-list");
const inputVal = document.querySelector(".maas");

btnOk.addEventListener("click", inputForPay);

/**
 *
 *
 * @param {*} e
 */
function inputForPay(e) {
  e.preventDefault();

  if (inputVal.value.length > 0 && inputVal.value > 0) {
    // clear UI
    deleteDOMelements();

    const brut = parseInt(inputVal.value);

    let totalFee = workerPay(brut);

    const newLi = document.createElement("li");
    newLi.innerHTML = "İşçi maaşı : " + totalFee.maas;
    payment.appendChild(newLi);

    const newLi1 = document.createElement("li");
    newLi1.innerHTML = "SGK işçi payı : " + totalFee.sgkIsci;
    payment.appendChild(newLi1);

    const newLi2 = document.createElement("li");
    newLi2.innerHTML =
      "İşsizlik sigortası işçi payı : " + totalFee.issizlikSigortasi;
    payment.appendChild(newLi2);

    const newLi3 = document.createElement("li");
    newLi3.innerHTML = "Gelir vergisi : " + totalFee.gelirVergisi;
    payment.appendChild(newLi3);

    const newLi4 = document.createElement("li");
    newLi4.innerHTML = "Damga vergisi : " + totalFee.damgaVergisi;
    payment.appendChild(newLi4);

    let companyFee = bossPay(inputVal.value);

    const newLi5 = document.createElement("li");
    newLi5.innerHTML =
      "İşverenin toplam işçi maaliyeti : " + companyFee.isverenPayi;
    payment.appendChild(newLi5);

    const newLi6 = document.createElement("li");
    newLi6.innerHTML = "SGK işveren payı : " + companyFee.sgkIsveren;
    payment.appendChild(newLi6);

    const newLi7 = document.createElement("li");
    newLi7.innerHTML =
      "İşsizlik sigortası işveren payı : " + companyFee.issizlikIsveren;
    payment.appendChild(newLi7);
  } else {
    alert("Brüt maaşı giriniz");
  }
}

/**
 *
 *
 * @param {*} brut
 * @return {*}
 */
function workerPay(brut) {
  let result = {};

  const SgkIsci = Number.parseFloat(brut * (14 / 100));
  const IssizSigortasi = Number.parseFloat(brut * (1 / 100));
  const GelirVergisiMatrahi = brut - (SgkIsci + IssizSigortasi);
  const GelirVergisi = Number.parseFloat(GelirVergisiMatrahi * (15 / 100));
  const DamgaVergisi = Number.parseFloat(brut * 0.00759);
  const maas = Number.parseFloat(
    brut - (SgkIsci + IssizSigortasi + GelirVergisi + DamgaVergisi)
  );

  result = {
    sgkIsci: SgkIsci.toFixed(2),
    issizlikSigortasi: IssizSigortasi.toFixed(2),
    gelirVergisi: GelirVergisi.toFixed(2),
    damgaVergisi: DamgaVergisi.toFixed(2),
    maas: maas.toFixed(2),
  };

  return result;
}

/**
 * calculates company fee
 *
 * @param {Number} brut - brut salary of the worker
 * @return {Object} - collection of objects
 */
function bossPay(brut) {
  let result = {};

  const SgkIsveren = Number.parseFloat(brut * (20.5 / 100));
  const IssizlikIsveren = Number.parseFloat(brut * (2 / 100));
  const IsverenPayi = Number.parseFloat(SgkIsveren + IssizlikIsveren);

  result = {
    isverenPayi: IsverenPayi.toFixed(2),
    issizlikIsveren: IssizlikIsveren.toFixed(2),
    sgkIsveren: SgkIsveren.toFixed(2),
  };

  return result;
}

/**
 *
 *
 */
function deleteDOMelements() {
  let ul = document.querySelector(".info-list");
  let liList = ul.children;

  Array.from(liList).forEach((li) => {
    li.remove();
  });
}
