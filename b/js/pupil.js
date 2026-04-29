document.addEventListener("DOMContentLoaded", () => {
  // 1. SCRIPT URL (Apps Script URL-ingni shu yerga qo'y bro)
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwlu4eNAiRjHbZLyKx3eZtSwPpYqyvjuxPERvFHIo8Frp4ClnH-IxyByPXYDOTFbRgbfA/exec"; 

  const phoneInput = document.getElementById("mainPhone");
  const form = document.querySelector(".puple__form");

  // --- 1. TELEFON FORMATLASH (MASK) ---
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, ""); 
      e.target.classList.remove("error-border");
      let matrix = "88 888 88 88";
      let i = 0;
      let newValue = matrix.replace(/[_\d]/g, (a) => {
        return i < val.length ? val.charAt(i++) : "";
      });
      e.target.value = newValue.trim();
    });
  }

  // --- 2. FORMANI TEKSHIRISH VA YUBORISH ---
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Barcha inputlarni element sifatida yig'amiz
      const elements = {
        name: document.getElementById("userName"),
        age: document.getElementById("userAge"),
        lang: document.getElementById("langLevel"),
        prog: document.getElementById("program"),
        phone: document.getElementById("mainPhone")
      };

      let isAllValid = true;

      // Oldingi xatolarni (qizil chiziqlarni) o'chirish
      Object.values(elements).forEach(el => {
        if (el) el.classList.remove("error-border");
      });

      // --- VALIDATSIYA (TEKSHIRUV) ---
      if (elements.name.value.trim().length < 2) {
        elements.name.classList.add("error-border");
        isAllValid = false;
      }
      if (!elements.age.value) {
        elements.age.classList.add("error-border");
        isAllValid = false;
      }
      if (!elements.lang.value) {
        elements.lang.classList.add("error-border");
        isAllValid = false;
      }
      if (!elements.prog.value) {
        elements.prog.classList.add("error-border");
        isAllValid = false;
      }
      // Telefon 9 ta raqam bo'lishi shart
      if (elements.phone.value.replace(/\D/g, "").length !== 9) {
        elements.phone.classList.add("error-border");
        isAllValid = false;
      }

      // AGAR HAMMASI TO'G'RI BO'LSA
      if (isAllValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = "YUBORILMOQDA...";
        }

        // --- LOCALSTORAGE GA SAQLASH (thankYou.js o'qishi uchun) ---
        const now = new Date();
        const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} - ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const formDataToStore = {
          Ism: elements.name.value,
          TelefonRaqam: "+998 " + elements.phone.value,
          SanaSoat: formattedTime,
          Yoshi: elements.age.value,
          Til: elements.lang.options[elements.lang.selectedIndex].text,
          Dastur: elements.prog.options[elements.prog.selectedIndex].text
        };

        localStorage.setItem("formData", JSON.stringify(formDataToStore));

        // --- GOOGLE SHEETS GA YUBORISH (BACKUP) ---
        const params = new URLSearchParams();
        params.append("sheetName", "Lead");
        params.append("Ism", formDataToStore.Ism);
        params.append("Telefon raqam", formDataToStore.TelefonRaqam);
        params.append("Royhatdan o'tgan vaqti", formDataToStore.SanaSoat);
        params.append("Yoshingizni kiriting", formDataToStore.Yoshi);
        params.append("Til darajangizni tanlang", formDataToStore.Til);
        params.append("Qaysi o'quv dasturiga ketmoqchisiz:", formDataToStore.Dastur);

        fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", 
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString()
        });

        // 0.5 sekunddan keyin rahmat sahifasiga o'tkazish
        setTimeout(() => {
          window.location.href = "./thankYou.html";
        }, 500);
      } else {
        // Xato bo'lsa birinchi xatoga fokus qilish
        const firstError = document.querySelector(".error-border");
        if (firstError) firstError.focus();
      }
    });
  }
});