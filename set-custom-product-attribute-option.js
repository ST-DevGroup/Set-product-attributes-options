
//Author: STDEV
// Description:This is the custom set product attributes & options by URL params on product page

document.addEventListener("DOMContentLoaded", function() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && node.querySelector('input[type=checkbox], input[type=radio]')) {
                    setCheckedFromParams();
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    function setCheckedFromParams() {
        var params = new URLSearchParams(window.location.search);
        
        params.forEach(function(value, key) {
            try {
                // Attempt to decode the value for each parameter
                var decodedValue = decodeURIComponent(value);
                applyValueToInputs(key, decodedValue);
            } catch (e) {
                console.error(`Error decoding parameter ${key}: ${e}. Attempting to use original value.`);
                applyValueToInputs(key, value);
            }
        });
    }

    function applyValueToInputs(key, value) {
        var inputs = document.querySelectorAll(`input[name="${key}"][value="${value}"]`);
        
        inputs.forEach(function(input) {
            if (input && (input.type === "radio" || input.type === "checkbox")) {
                input.checked = true;
                console.log(`${input.type} with name ${key} and value ${value} found and selected.`);
            }
        });
    }
});
