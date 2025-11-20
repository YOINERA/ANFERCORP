// Datos globales para almacenar la cotización
let quoteData = {};
let bankCounter = 0;

// Inicializar bancos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    addBank(); // Agregar un banco por defecto
    
    // Establecer fecha actual
    const today = new Date();
    document.getElementById('quote-date').valueAsDate = today;
    
    // Establecer fecha de vigencia (15 días después)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    document.getElementById('valid-until').valueAsDate = futureDate;
});

// Función para agregar un nuevo banco
function addBank() {
    bankCounter++;
    const bankContainer = document.getElementById('bank-accounts-container');
    const bankItem = document.createElement('div');
    bankItem.className = 'bank-item';
    bankItem.id = `bank-${bankCounter}`;
    
    bankItem.innerHTML = `
        <div class="bank-item-header">
            <div class="bank-title">Banco ${bankCounter}</div>
            <button type="button" class="btn btn-remove" onclick="removeBank(${bankCounter})">Eliminar</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="bank-name-${bankCounter}">Nombre del Banco</label>
                <input type="text" id="bank-name-${bankCounter}" placeholder="BCP">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="bank-account-pen-${bankCounter}">Cuenta Soles</label>
                <input type="text" id="bank-account-pen-${bankCounter}" placeholder="5707200550002">
            </div>
            <div class="form-group">
                <label for="bank-cci-pen-${bankCounter}">CCI Soles</label>
                <input type="text" id="bank-cci-pen-${bankCounter}" placeholder="00257000720055000209">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="bank-account-usd-${bankCounter}">Cuenta Dólares</label>
                <input type="text" id="bank-account-usd-${bankCounter}" placeholder="No especificada">
            </div>
            <div class="form-group">
                <label for="bank-cci-usd-${bankCounter}">CCI Dólares</label>
                <input type="text" id="bank-cci-usd-${bankCounter}" placeholder="No especificada">
            </div>
        </div>
    `;
    
    bankContainer.appendChild(bankItem);
}

// Función para eliminar un banco
function removeBank(bankId) {
    const bankItem = document.getElementById(`bank-${bankId}`);
    if (bankItem && document.querySelectorAll('.bank-item').length > 1) {
        bankItem.remove();
    } else if (document.querySelectorAll('.bank-item').length === 1) {
        alert('Debe haber al menos un banco en la cotización');
    }
}

// Función para agregar un nuevo artículo a la tabla
function addItem() {
    const itemsBody = document.getElementById('items-body');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td><input type="text" class="item-desc" placeholder="Descripción del artículo"></td>
        <td>
            <select class="item-unit">
                <option value="UND">UND</option>
                <option value="KG">KG</option>
                <option value="PAR">PAR</option>
                <option value="MTS">MTS</option>
                <option value="GLN">GLN</option>
                <option value="LTS">LTS</option>
                <option value="CAJ">CAJ</option>
                <option value="ROL">ROL</option>
            </select>
        </td>
        <td><input type="number" class="item-qty" value="1" min="1"></td>
        <td><input type="number" class="item-price" placeholder="0.00" step="0.01" min="0"></td>
        <td><button type="button" class="btn btn-remove" onclick="removeItem(this)">Eliminar</button></td>
    `;
    
    itemsBody.appendChild(newRow);
}

// Función para eliminar un artículo de la tabla
function removeItem(button) {
    const row = button.closest('tr');
    const itemsBody = document.getElementById('items-body');
    
    if (itemsBody.children.length > 1) {
        row.remove();
    }
}

// Función para mostrar la vista previa - CORREGIDA
function showPreview() {
    try {
        const defaultLogo = '<img src="accents/ANFERCORP.jpeg" alt="Logo">';

        // Recopilar datos del formulario de forma segura
        quoteData = {
            logo: defaultLogo,
            companyName: 'ANFERCORP S.A.C.',
            companyRuc: '20605975225',
            companyAddress: 'Av. America Sur 1178 - Trujillo - Trujillo',
            companyPhone: '966927253',
            companyEmail: 'anfercorp.pe@gmail.com',
            quoteNumber: document.getElementById('quote-number').value || '0001 - 0000279',
            quoteDate: document.getElementById('quote-date').value,
            validUntil: document.getElementById('valid-until').value,
            currency: document.getElementById('currency').value || 'PEN',
            orderType: document.getElementById('order-type').value || 'Entrega Inmediata',
            clientRuc: document.getElementById('client-ruc').value || '20605975225',
            clientName: document.getElementById('client-name').value || 'CONSORCIO COPTOS',
            clientAddress: document.getElementById('client-address').value || 'AV. HUANACAURE NRO. 959 URB. TAHUANTINSUYO ZN. CUATRO LIMA LIMA INDEPENDENCIA',
            clientDistrict: document.getElementById('client-district').value || 'INDEPENDENCIA',
            clientProvince: document.getElementById('client-province').value || 'LIMA',
            clientDepartment: document.getElementById('client-department').value || 'LIMA',
            advisorName: document.getElementById('advisor-name').value || 'Huamanchumo Paula',
            banks: [],
            items: []
        };
        
        // Recopilar bancos
        const bankItems = document.querySelectorAll('.bank-item');
        quoteData.banks = [];
        
        bankItems.forEach(bankItem => {
            const bankId = bankItem.id.split('-')[1];
            const bankName = document.getElementById(`bank-name-${bankId}`).value || 'BCP';
            const accountPen = document.getElementById(`bank-account-pen-${bankId}`).value || '';
            const cciPen = document.getElementById(`bank-cci-pen-${bankId}`).value || '';
            const accountUsd = document.getElementById(`bank-account-usd-${bankId}`).value || '';
            const cciUsd = document.getElementById(`bank-cci-usd-${bankId}`).value || '';
            
            quoteData.banks.push({
                name: bankName,
                accountPen,
                cciPen,
                accountUsd,
                cciUsd
            });
        });
        
        // Recopilar artículos de forma segura
        const itemRows = document.querySelectorAll('#items-body tr');
        quoteData.items = [];
        
        itemRows.forEach(row => {
            const desc = row.querySelector('.item-desc').value || 'Artículo';
            const unit = row.querySelector('.item-unit').value || 'UND';
            const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            
            quoteData.items.push({
                desc,
                unit,
                qty,
                price
            });
        });
        
        // Generar vista previa
        generatePreview(quoteData);
        
        // Cambiar a pantalla de vista previa
        document.getElementById('form-screen').classList.remove('active');
        document.getElementById('preview-screen').classList.add('active');
        
    } catch (error) {
        console.error('Error en showPreview:', error);
        alert('Error al generar la vista previa. Verifique que todos los campos estén completos.');
    }
}

// Función para generar la vista previa
function generatePreview(data) {
    try {
        // Calcular totales
        let subtotal = 0;
        const itemsWithTotals = data.items.map(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            
            return {
                ...item,
                itemTotal
            };
        });
        
        // Calcular IGV (18%)
        const totalIgv = subtotal * 0.18;
        const total = subtotal + totalIgv;
        
        // Formatear fechas
        const formatDate = (dateString) => {
            if (!dateString) return '10/11/2025';
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('es-PE');
            } catch {
                return '10/11/2025';
            }
        };
        
        // Símbolo de moneda
        const currencySymbol = data.currency === 'USD' ? 'US$' : 'S/';
        
        // Generar HTML de la cotización con nuevo diseño
        const quoteHTML = `
            <div class="header-container">
                <div class="company-info">
                    <div class="logo-container">
                        ${data.logo ? `<div class="logo-preview-large">${data.logo}</div>` : ''}
                    </div>
                    <div class="company-text">
                        <div class="company-name" style="text-align: center">${data.companyName}</div>
                        <div class="company-desc">MAQUINAS - HERRAMIENTAS - EPPS</div>
                        <div class="client-info">
                            <p>Dirección: ${data.companyAddress}</p>
                            <p>Correo: ${data.companyEmail}</p>
                            <p>Teléfono: ${data.companyPhone}</p>
                        </div>
                    </div>
                </div>
                
                <div class="quote-info">
                        
                        <div class="quote-number-box">
                            <div class="company-subtitle">${data.companyRuc}</div>
                            <div class="quote-header-text">COTIZACIÓN</div>
                            <div class="quote-number">${data.quoteNumber}</div>
                        </div>
                        <br></br>
                    <div class="quote-details">
                        
                        <div><strong>Fecha Emisión:</strong> ${formatDate(data.quoteDate)}</div>
                        <div><strong>Vigencia:</strong> ${formatDate(data.validUntil)}</div>
                        <div><strong>Asesor:</strong> ${data.advisorName}</div>
                        
                    </div>
                </div>
            </div>
            <div style="border-bottom: 1px solid #000; margin: 10px 0;"></div>
           <div class="info-container">
                <div class="client-details">
                    <p><strong>CLIENTE:</strong> ${data.clientName}</p>
                    <p><strong>RUC:</strong> ${data.clientRuc}</p>
                    <p><strong>DIRECCIÓN:</strong> ${data.clientAddress}</p>
                    <p>${data.clientDistrict} - ${data.clientProvince} - ${data.clientDepartment}</p>
                </div>
            </div>

            <div style="border-bottom: 1px solid #000; margin: 10px 0;"></div>
            
            <table class="quote-table">
                <thead>
                    <tr>
                        <th class="num-column">ITEM</th>
                        <th class="desc-column">DESCRIPCIÓN</th>
                        <th class="unit-column">UNIDAD</th>
                        <th class="qty-column">CANTIDAD</th>
                        <th class="price-column">PRECIO UNIT.</th>
                        <th class="total-column">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsWithTotals.map((item, index) => `
                        <tr>
                            <td style="text-align: center">${index + 1}</td>
                            <td>${item.desc}</td>
                            <td style="text-align: center">${item.unit}</td>
                            <td style="text-align: center">${item.qty}</td>
                            <td style="text-align: center">${currencySymbol} ${item.price.toFixed(2)}</td>
                            <td style="text-align: center">${currencySymbol} ${item.itemTotal.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="totals">
                <table>
                    <tr>
                        <td>GRAVADO</td>
                        <td>${currencySymbol} ${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>I.G.V. 18%</td>
                        <td>${currencySymbol} ${totalIgv.toFixed(2)}</td>
                    </tr>
                    <tr class="total-row">
                        <td><strong>TOTAL</strong></td>
                        <td><strong>${currencySymbol} ${total.toFixed(2)}</strong></td>
                    </tr>
                </table>
            </div>
            
            <div class="bank-info">
                <p><strong>CUENTAS  BANCARIAS:</strong></p>
                <div class="bank-container">
                    ${data.banks.map(bank => `
                        <div class="bank-column">
                            <div class="bank-title">${bank.name}:</div>
                            ${bank.accountPen ? `<div>SOLES: Cta. Cte: ${bank.accountPen} - CCI: ${bank.cciPen}</div>` : ''}
                            ${bank.accountUsd ? `<div>DÓLARES: Cta. Cte: ${bank.accountUsd} - CCI: ${bank.cciUsd}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="position: fixed; bottom: 0; left: 0; width: 100%; border-top: 10px solid #efb810; margin: 0; background: transparent;"></div>
        `;
        
        // Mostrar la vista previa
        document.getElementById('quote-preview').innerHTML = quoteHTML;
        
    } catch (error) {
        console.error('Error en generatePreview:', error);
        document.getElementById('quote-preview').innerHTML = '<p>Error al generar la vista previa. Por favor, verifique los datos.</p>';
    }
}

// Función para volver al formulario
function showForm() {
    document.getElementById('preview-screen').classList.remove('active');
    document.getElementById('form-screen').classList.add('active');
}

// Función para cancelar la cotización
function cancelQuote() {
    if (confirm('¿Está seguro de que desea cancelar esta cotización?')) {
        resetForm();
        showForm();
    }
}

// Función para mostrar la pantalla de impresión
function showPrint() {
    generatePrintView(quoteData);
    document.getElementById('preview-screen').classList.remove('active');
    document.getElementById('print-screen').classList.add('active');
}

// Función para generar la vista de impresión
function generatePrintView(data) {
    // Usar la misma lógica que generatePreview pero para impresión
    generatePreview(data);
    document.getElementById('quote-print').innerHTML = document.getElementById('quote-preview').innerHTML;
}

// Función para enviar por WhatsApp
function sendWhatsApp() {
    const companyName = quoteData.companyName || 'ANFERCORP S.A.C.';
    const quoteNumber = quoteData.quoteNumber || '0001 - 0000279';
    
    let message = `*Cotización ${quoteNumber} - ${companyName}*%0A%0A`;
    message += `Estimado cliente, adjuntamos su cotización.%0A%0A`;
    message += `*Cliente:* ${quoteData.clientName}%0A`;
    message += `*RUC:* ${quoteData.clientRuc}%0A`;
    message += `*Vigencia:* ${new Date(quoteData.validUntil).toLocaleDateString('es-PE')}%0A%0A`;
    message += `Para más información, contáctenos.`;
    
    window.open(`https://wa.me/?text=${message}`, '_blank');
}

// Función para nueva cotización
function newQuote() {
    resetForm();
    document.getElementById('print-screen').classList.remove('active');
    document.getElementById('form-screen').classList.add('active');
}

// Función para resetear el formulario
function resetForm() {
    // Solo restablecer los campos que EXISTEN en el formulario actual
    const fields = [
        'quote-number', 'client-ruc', 'client-name', 'client-address',
        'client-district', 'client-province', 'client-department',
        'advisor-name'
    ];
    
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) element.value = '';
    });
    
    // Resetear tabla de artículos
    const itemsBody = document.getElementById('items-body');
    itemsBody.innerHTML = `
        <tr>
            <td><input type="text" class="item-desc" placeholder="Descripción del artículo"></td>
            <td>
                <select class="item-unit">
                    <option value="UND">UND</option>
                    <option value="KG">KG</option>
                    <option value="PAR">PAR</option>
                    <option value="MTS">MTS</option>
                    <option value="GLN">GLN</option>
                    <option value="LTS">LTS</option>
                    <option value="CAJ">CAJ</option>
                    <option value="ROL">ROL</option>
                </select>
            </td>
            <td><input type="number" class="item-qty" value="1" min="1"></td>
            <td><input type="number" class="item-price" placeholder="0.00" step="0.01" min="0"></td>
            <td><button type="button" class="btn btn-remove" onclick="removeItem(this)">Eliminar</button></td>
        </tr>
    `;
    
    // Resetear bancos
    const bankContainer = document.getElementById('bank-accounts-container');
    bankContainer.innerHTML = '';
    bankCounter = 0;
    addBank(); // Agregar un banco por defecto
    
    // Restablecer fechas
    document.getElementById('quote-date').valueAsDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    document.getElementById('valid-until').valueAsDate = futureDate;
    
    // Restablecer selects
    document.getElementById('currency').value = 'PEN';
    document.getElementById('order-type').value = 'Entrega Inmediata';
}
