document.addEventListener("DOMContentLoaded", () => {
    const countries = [
        { name: "Uzbekistan", code: "+998", flag: "🇺🇿", mask: "00 000 00 00" },
        { name: "Tajikistan", code: "+992", flag: "🇹🇯", mask: "00 000 00 00" },
        { name: "Qirg'iziston", code: "+996", flag: "🇰🇬", mask: "000 000 000" },
        { name: "Qozog'iston", code: "+7", flag: "🇰🇿", mask: "000 000 00 00" },
        { name: "Rossiya", code: "+7", flag: "🇷🇺", mask: "000 000 00 00" },
        { name: "AQSH", code: "+1", flag: "🇺🇸", mask: "000 000 0000" },
        { name: "Janubiy Koreya", code: "+82", flag: "🇰🇷", mask: "00 0000 0000" },
        { name: "Turkiya", code: "+90", flag: "🇹🇷", mask: "000 000 00 00" }
    ];

    const dropdown = document.getElementById("countryDropdown");
    const selectedCodeText = document.getElementById("selectedCode");
    const phoneInput = document.getElementById("mainPhone");
    const selectBtn = document.getElementById("mainSelectedCountry");
    const arrow = document.querySelector(".arow");
    const form = document.querySelector("form");
    const submitBtn = document.querySelector(".submit-btn");

    let currentMask = "00 000 00 00"; 

    // 1. Dropdown to'ldirish
    if (dropdown) {
        dropdown.innerHTML = "";
        countries.forEach(country => {
            const item = document.createElement("div");
            item.classList.add("country-item");
            item.innerHTML = `
                <span class="flag">${country.flag}</span> 
                <span class="country-name">${country.name}</span> 
                <span class="country-code">${country.code}</span>
            `;
            
            item.addEventListener("click", (e) => {
                e.stopPropagation();
                selectedCodeText.innerHTML = `${country.flag} ${country.code}`;
                currentMask = country.mask;
                phoneInput.value = "";
                phoneInput.placeholder = country.mask;
                phoneInput.focus();
                dropdown.classList.remove("show");
                if (arrow) arrow.classList.remove("rotate");
            });
            dropdown.appendChild(item);
        });
    }

    // 2. Maska mantiqi
    phoneInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, ""); 
        let formatted = "";
        let valIndex = 0;
        for (let i = 0; i < currentMask.length && valIndex < val.length; i++) {
            if (currentMask[i] === "0") {
                formatted += val[valIndex++];
            } else {
                formatted += currentMask[i];
            }
        }
        e.target.value = formatted;
    });

    // 3. DUBLIKATNI TO'XTATISH (ENG MUHIM QISM)
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // Brauzer o'zi yuborib yubormasligi uchun to'xtatamiz

            if (submitBtn.disabled) return; // Agar jarayon ketayotgan bo'lsa, qayta ishlamasin

            // Tugmani bloklash
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Yuborilmoqda...";

            try {
                const formData = new FormData(form);
                
                // Google Apps Script URL-ni shu yerga qo'ying
                const scriptURL = form.action || "SENING_SCRIPT_URLING"; 

                const response = await fetch(scriptURL, { 
                    method: 'POST', 
                    body: formData 
                });

                const result = await response.json();

                if (result.ok) {
                    alert("Ma'lumot qabul qilindi!");
                    form.reset();
                    // Boshlang'ich maskaga qaytarish
                    phoneInput.placeholder = "00 000 00 00";
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error('Xatolik:', error);
                alert("Xatolik yuz berdi, qaytadan urinib ko'ring.");
            } finally {
                // Har qanday holatda ham tugmani qayta faollashtirish
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }

    // 4. Dropdown ochish/yopish
    selectBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
        if (arrow) arrow.classList.toggle("rotate");
    });

    window.addEventListener("click", () => {
        if (dropdown && dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
            if (arrow) arrow.classList.remove("rotate");
        }
    });
});