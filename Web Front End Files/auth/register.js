let currentStep = 1;
const totalSteps = 6;

const updateUI = () => {
    document.querySelectorAll('.step-container').forEach(el => el.classList.remove('active'));
    const currentEl = document.querySelector(`.step-container[data-step="${currentStep}"]`);
    if (currentEl) currentEl.classList.add('active');
    
    // Handle Success State
    if (currentStep === 'success') {
        document.querySelector(`.step-container[data-step="success"]`).classList.add('active');
        document.getElementById('next-btn').textContent = 'Go to Feed';
        document.getElementById('prev-step').style.display = 'none';
    } else {
        document.getElementById('next-btn').innerHTML = 'Next &rarr;';
        document.getElementById('prev-step').style.display = currentStep === 1 ? 'none' : 'block';
    }
};

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentStep === 'success') {
        window.location.href = '../feed/feed.html';
        return;
    }

    // Simple validation
    const currentContainer = document.querySelector(`.step-container[data-step="${currentStep}"]`);
    const inputs = currentContainer.querySelectorAll('input, select');
    let valid = true;
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value) valid = false;
    });

    if (!valid) {
        alert('Please fill in all required fields');
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        updateUI();
    } else {
        // Submit
        const formData = new FormData(document.getElementById('register-form'));
        const data = Object.fromEntries(formData.entries());
        
        // Mock Save
        const user = {
            id: Utils.generateId(),
            ...data,
            avatar: `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=6366f1&color=fff`
        };
        Utils.store('currentUser', user);
        
        currentStep = 'success';
        updateUI();
    }
});

document.getElementById('prev-step').addEventListener('click', () => {
    if (currentStep > 1 && currentStep !== 'success') {
        currentStep--;
        updateUI();
    } else if (currentStep === 1) {
        window.location.href = 'login.html';
    }
});

// Init
updateUI();
