// Datos globales para almacenar la cotización
let quoteData = {};
let bankCounter = 0;

// Base de datos de asesores
const ADVISORS_DB = [
    { id: 1, name: "Huamanchumo Paula", active: true },
    { id: 2, name: "Alayo Yoiner", active: true }
];

//Base de datos de bancos

const DEFAULT_BANKS = [
    {
        name: "BCP",
        accountPen: "5707200550002",
        cciPen: "00257000720055000209"
    },
    {
        name: "INTERBANK",
        accountPen: "600-3007138013",
        cciPen: "003-600-003007138013-40",
        accountUsd: "600-3007138020",
        cciUsd: "003-600-003007138020-45"
    }
];

// Base de datos de productos
const PRODUCTS_DB = [
    { id: 1, code: "H001", name: "Martillo de Acero 16oz", unit: "UND", price: 25.50 },
    { id: 2, code: "H002", name: "Destornillador Phillips #2", unit: "UND", price: 8.90 }
];


// Base de datos de empresas/clientes frecuentes
const COMPANIES_DB = [
    {
        ruc: "20605975225",
        name: "CONSORCIO COPTOS",
        address: "AV. HUANACAURE NRO. 959 URB. TAHUANTINSUYO ZN. CUATRO LIMA LIMA INDEPENDENCIA",
        district: "INDEPENDENCIA",
        province: "LIMA",
        department: "LIMA"
    },
    {
        ruc: "20606121084",
        name: "INVERSIONES D ROMERO E.I.R.L.",
        address: "CAL.JOAQUIN CAPELLA NRO. 230 URB. INGENIERIA LIMA",
        district: "SAN MARTIN DE PORRES",
        province: "LIMA",
        department: "LIMA"
    }
    // Puedes agregar más empresas aquí según necesites
];

// Inicializar bancos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Agregar bancos por defecto
    DEFAULT_BANKS.forEach(bank => {
        addBank(bank);
    });
    
    // Establecer fecha actual
    const today = new Date();
    document.getElementById('quote-date').valueAsDate = today;
    
    // Establecer fecha de vigencia (15 días después)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    document.getElementById('valid-until').valueAsDate = futureDate;

    // Cargar asesores en el select
    loadAdvisors();
    
    // Configurar buscador de productos
    setupProductSearch();
});



// Función para cargar asesores en el select
function loadAdvisors() {
    const advisorSelect = document.getElementById('advisor-name');
    
    // Limpiar opciones existentes
    advisorSelect.innerHTML = '';
    
    // Agregar opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione un asesor';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    advisorSelect.appendChild(defaultOption);
    
    // Agregar asesores activos
    ADVISORS_DB
        .filter(advisor => advisor.active)
        .forEach(advisor => {
            const option = document.createElement('option');
            option.value = advisor.name;
            option.textContent = advisor.name;
            advisorSelect.appendChild(option);
        });
}

// Función para configurar el buscador de productos
function setupProductSearch() {
    const searchInput = document.getElementById('product-search');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }
        
        // Filtrar productos
         const filteredProducts = PRODUCTS_DB.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.code.toLowerCase().includes(searchTerm)
        );
        
        // Mostrar resultados
        if (filteredProducts.length > 0) {
            searchResults.innerHTML = filteredProducts.map(product => `
                <div class="search-result-item" data-product-id="${product.id}">
                    <div class="product-info">
                        <strong>${product.name}</strong> (${product.code})
                    </div>
                    <div class="product-details">
                        ${product.category} - ${product.unit} - S/ ${product.price.toFixed(2)}
                    </div>
                    <button type="button" class="btn btn-add-product">Agregar</button>
                </div>
            `).join('');
            
            searchResults.style.display = 'block';
            
            // Configurar eventos para los botones de agregar
            document.querySelectorAll('.btn-add-product').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.closest('.search-result-item').dataset.productId);
                    addProductFromSearch(productId);
                    searchInput.value = '';
                    searchResults.style.display = 'none';
                    searchResults.innerHTML = '';
                });
            });
        } else {
            searchResults.innerHTML = '<div class="no-results">No se encontraron productos</div>';
            searchResults.style.display = 'block';
        }
    });
    
    // Ocultar resultados al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
        }
    });
}

// Función para verificar si un producto ya existe en la tabla
function productExists(productName) {
    const existingItems = document.querySelectorAll('.item-desc');
    for (let item of existingItems) {
        if (item.value.toLowerCase().trim() === productName.toLowerCase().trim()) {
            return true;
        }
    }
    return false;
}

// Función para agregar producto desde la búsqueda
function addProductFromSearch(productId) {
    const product = PRODUCTS_DB.find(p => p.id === productId);
    
    if (product) {
        // Verificar si el producto ya existe
        if (productExists(product.name)) {
            alert('Este producto ya ha sido agregado a la cotización.');
            return;
        }
        
        const itemsBody = document.getElementById('items-body');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td><input type="text" class="item-desc" value="${product.name}" placeholder="Descripción del artículo"></td>
            <td>
                <select class="item-unit">
                    <option value="UND" ${product.unit === 'UND' ? 'selected' : ''}>UND</option>
                    <option value="KG" ${product.unit === 'KG' ? 'selected' : ''}>KG</option>
                    <option value="PAR" ${product.unit === 'PAR' ? 'selected' : ''}>PAR</option>
                    <option value="MTS" ${product.unit === 'MTS' ? 'selected' : ''}>MTS</option>
                    <option value="GLN" ${product.unit === 'GLN' ? 'selected' : ''}>GLN</option>
                    <option value="LTS" ${product.unit === 'LTS' ? 'selected' : ''}>LTS</option>
                    <option value="CAJ" ${product.unit === 'CAJ' ? 'selected' : ''}>CAJ</option>
                    <option value="ROL" ${product.unit === 'ROL' ? 'selected' : ''}>ROL</option>
                </select>
            </td>
            <td><input type="number" class="item-qty" value="1" min="1"></td>
            <td><input type="number" class="item-price" value="${product.price}" step="0.01" min="0"></td>
            <td><button type="button" class="btn btn-remove" onclick="removeItem(this)">Eliminar</button></td>
        `;
        
        itemsBody.appendChild(newRow);
        
        // Agregar evento para validar duplicados cuando se edite manualmente
        const descInput = newRow.querySelector('.item-desc');
        descInput.addEventListener('blur', function() {
            validateDuplicateProducts();
        });
    }
}

// Función para buscar cliente por RUC
function searchClientByRUC() {
    const rucInput = document.getElementById('client-ruc');
    const searchResults = document.getElementById('client-search-results');
    const ruc = rucInput.value.trim();
    
    // Ocultar resultados si el campo está vacío
    if (ruc.length === 0) {
        searchResults.style.display = 'none';
        searchResults.innerHTML = '';
        return;
    }
    
    // Buscar coincidencias en la base de datos (no solo coincidencia exacta)
    const foundClients = COMPANIES_DB.filter(client => 
        client.ruc.includes(ruc) || 
        client.name.toLowerCase().includes(ruc.toLowerCase())
    );
    
    if (foundClients.length > 0) {
        // Mostrar todos los clientes que coinciden
        searchResults.innerHTML = foundClients.map(client => `
            <div class="search-result-item" onclick="fillClientData('${client.ruc}')">
                <div class="client-info">
                    <div class="client-name">${client.name}</div>
                    <div class="client-ruc">RUC: ${client.ruc}</div>
                    <div class="client-details">${client.address}</div>
                </div>
            </div>
        `).join('');
        
        searchResults.style.display = 'block';
    } else {
        // Mostrar opción para agregar manualmente
        searchResults.innerHTML = `
        `;
        searchResults.style.display = 'block';
    }
}

// Función para llenar automáticamente los datos del cliente
function fillClientData(ruc) {
    const client = COMPANIES_DB.find(c => c.ruc === ruc);
    
    if (client) {
        document.getElementById('client-ruc').value = client.ruc;
        document.getElementById('client-name').value = client.name;
        document.getElementById('client-address').value = client.address;
        document.getElementById('client-district').value = client.district;
        document.getElementById('client-province').value = client.province;
        document.getElementById('client-department').value = client.department;
        
        // Ocultar resultados de búsqueda
        document.getElementById('client-search-results').style.display = 'none';
        
        // Habilitar edición por si el usuario quiere modificar algo
        disableClientFields(true);
    }
}
// Cerrar resultados de búsqueda al hacer clic fuera
document.addEventListener('click', function(e) {
    const clientSearch = document.getElementById('client-ruc');
    const clientResults = document.getElementById('client-search-results');
    
    if (!clientSearch.contains(e.target) && !clientResults.contains(e.target)) {
        clientResults.style.display = 'none';
    }
});



// Función para habilitar/deshabilitar campos del cliente
function disableClientFields(enable) {
    const fields = [
        'client-name',
        'client-address', 
        'client-district',
        'client-province',
        'client-department'
    ];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.disabled = !enable;
            field.style.backgroundColor = enable ? '#fff' : '#f8f9fa';
        }
    });
}




// Función para agregar un nuevo banco
function addBank(bankData = null) {
    bankCounter++;
    const bankContainer = document.getElementById('bank-accounts-container');
    const bankItem = document.createElement('div');
    bankItem.className = 'bank-item';
    bankItem.id = `bank-${bankCounter}`;
    
    // Si no se proporcionan datos, usar datos vacíos
    const data = bankData || {
        name: '',
        accountPen: '',
        cciPen: '',
        accountUsd: '',
        cciUsd: ''
    };
    
    bankItem.innerHTML = `
        <div class="bank-item-header">
            <div class="bank-title">Banco ${bankCounter}</div>
            <button type="button" class="btn btn-remove" onclick="removeBank(${bankCounter})">Eliminar</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="bank-name-${bankCounter}">Nombre del Banco</label>
                <input type="text" id="bank-name-${bankCounter}" value="${data.name}" placeholder="No especificado">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="bank-account-pen-${bankCounter}">Cuenta Soles</label>
                <input type="text" id="bank-account-pen-${bankCounter}" value="${data.accountPen}" placeholder="No especificada">
            </div>
            <div class="form-group">
                <label for="bank-cci-pen-${bankCounter}">CCI Soles</label>
                <input type="text" id="bank-cci-pen-${bankCounter}" value="${data.cciPen}" placeholder="No especificada">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="bank-account-usd-${bankCounter}">Cuenta Dólares</label>
                <input type="text" id="bank-account-usd-${bankCounter}" value="${data.accountUsd}" placeholder="No especificada">
            </div>
            <div class="form-group">
                <label for="bank-cci-usd-${bankCounter}">CCI Dólares</label>
                <input type="text" id="bank-cci-usd-${bankCounter}" value="${data.cciUsd}" placeholder="No especificada">
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
    
    // Agregar evento para validar duplicados cuando se edite manualmente
    const descInput = newRow.querySelector('.item-desc');
    descInput.addEventListener('blur', function() {
        validateDuplicateProducts();
    });
}

// Función para validar productos duplicados en toda la tabla
function validateDuplicateProducts() {
    const items = document.querySelectorAll('.item-desc');
    const duplicates = {};
    let hasDuplicates = false;
    
    // Contar ocurrencias de cada producto
    items.forEach(item => {
        const productName = item.value.toLowerCase().trim();
        if (productName) {
            duplicates[productName] = (duplicates[productName] || 0) + 1;
        }
    });
    
    // Remover clases de error anteriores
    items.forEach(item => {
        item.classList.remove('duplicate-error');
    });
    
    // Aplicar clase de error a los duplicados
    items.forEach(item => {
        const productName = item.value.toLowerCase().trim();
        if (productName && duplicates[productName] > 1) {
            item.classList.add('duplicate-error');
            hasDuplicates = true;
        }
    });
    
    return hasDuplicates;
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
        // Validar si hay productos duplicados
        if (validateDuplicateProducts()) {
            alert('No puede haber productos duplicados en la cotización. Por favor, corrija los productos marcados en rojo.');
            return;
        }
        
        const defaultLogo = '<img src="accents/ANFERCORP.jpeg" alt="Logo">';

        // Recopilar datos del formulario de forma segura
        quoteData = {
            logo: defaultLogo,
            companyName: 'ANFERCORP S.A.C.',
            companyRuc: '20605975225',
            companyAddress: 'Av. America Sur 1178 - Trujillo - Trujillo',
            companyPhone: '966927253',
            companyEmail: 'anfercorp.pe@gmail.com',
            quoteNumber: document.getElementById('quote-number').value || '0001 - 01',
            quoteDate: document.getElementById('quote-date').value,
            validUntil: document.getElementById('valid-until').value,
            currency: document.getElementById('currency').value || 'PEN',
            orderType: document.getElementById('order-type').value || 'Entrega Inmediata',
            clientRuc: document.getElementById('client-ruc').value || '',
            clientName: document.getElementById('client-name').value || '',
            clientAddress: document.getElementById('client-address').value || '',
            clientDistrict: document.getElementById('client-district').value || '',
            clientProvince: document.getElementById('client-province').value || '',
            clientDepartment: document.getElementById('client-department').value || '',
            advisorName: document.getElementById('advisor-name').value || '',
            banks: [],
            items: []
        };
        
        // Recopilar bancos
        const bankItems = document.querySelectorAll('.bank-item');
        quoteData.banks = [];
        
        bankItems.forEach(bankItem => {
            const bankId = bankItem.id.split('-')[1];
            const bankName = document.getElementById(`bank-name-${bankId}`).value || '';
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
        
        // CALCULAR GRAVADO (BASE IMPONIBLE) Y IGV CORRECTAMENTE
        const gravado = subtotal / 1.18;
        const totalIgv = subtotal - gravado;
        const total = subtotal;
        
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
        
        // Generar HTML de las cuentas bancarias para el pie de página
        const footerBanksHTML = `
            <div class="footer-section">
                <div style="border-top: 0px solid #000; margin-bottom: 10px; padding-top: 10px;">
                    <strong style="font-size: 14px;">CUENTAS BANCARIAS:</strong>
                </div>
                <div class="footer-banks">
                    ${data.banks.map(bank => `
                        <div class="footer-bank">
                            <div class="footer-bank-title" style="font-size: 12px;">${bank.name}:</div>
                            <div class="footer-bank-details" style="font-size: 11px;">
                                ${bank.accountPen ? `<div>SOLES: Cta. ${bank.accountPen} - CCI: ${bank.cciPen}</div>` : ''}
                                ${bank.accountUsd ? `<div>DÓLARES: Cta. ${bank.accountUsd} - CCI: ${bank.cciUsd}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Generar HTML del encabezado para páginas 2+
        const pageHeaderHTML = `
            <div class="page-header-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <div style="font-weight: bold; font-size: 14px;">${data.companyName} - ${data.companyRuc}</div>
                    <div style="font-size: 12px;">Cotización: ${data.quoteNumber}</div>
                </div>
                <div style="font-size: 11px; border-top: 1px solid #000; padding-top: 5px;">
                    <strong>CLIENTE:</strong> ${data.clientName} - <strong>RUC:</strong> ${data.clientRuc} - 
                    <strong>DIRECCIÓN:</strong> ${data.clientAddress}
                </div>
            </div>
        `;
        
        // Dividir los items en páginas - 25 items por página
        const itemsPerPage = 30;
        const pages = [];
        
        for (let i = 0; i < itemsWithTotals.length; i += itemsPerPage) {
            pages.push(itemsWithTotals.slice(i, i + itemsPerPage));
        }
        
        // Generar HTML para todas las páginas
        let allPagesHTML = '';
        for (let i = 0; i < pages.length; i++) {
            const isLastPage = (i === pages.length - 1);
            allPagesHTML += generatePageHTML(data, pages[i], i, pageHeaderHTML, footerBanksHTML, currencySymbol, gravado, totalIgv, total, formatDate, i > 0, isLastPage);
        }
        
        // Mostrar la vista previa
        document.getElementById('quote-preview').innerHTML = allPagesHTML;
        
    } catch (error) {
        console.error('Error en generatePreview:', error);
        document.getElementById('quote-preview').innerHTML = '<p>Error al generar la vista previa. Por favor, verifique los datos.</p>';
    }
}

// Función auxiliar para generar HTML de cada página
function generatePageHTML(data, pageItems, pageIndex, pageHeaderHTML, footerBanksHTML, currencySymbol, gravado, totalIgv, total, formatDate, isSecondaryPage, isLastPage) {
    const pageClass = isSecondaryPage ? 'secondary-page' : '';
    
    return `
        <div class="${pageClass}">
            ${isSecondaryPage ? pageHeaderHTML : ''}
            
            ${!isSecondaryPage ? `
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
                    <div class="quote-details" style="margin-top: 5px;">
                        <div class="detail-row">
                            <span class="detail-label" >FECHA EMISION:</span>
                            <span class="detail-value">${formatDate(data.quoteDate)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">FECHA VENCIMIENTO:</span>
                            <span class="detail-value">${formatDate(data.validUntil)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">VENDEDOR:</span>
                            <span class="detail-value">${data.advisorName}</span>
                        </div>
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
            ` : ''}
            
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
                    ${pageItems.map((item, index) => `
                        <tr>
                            <td style="text-align: center">${(pageIndex * 30) + index + 1}</td>
                            <td>${item.desc}</td>
                            <td style="text-align: center">${item.unit}</td>
                            <td style="text-align: center">${item.qty}</td>
                            <td style="text-align: center">${currencySymbol} ${item.price.toFixed(2)}</td>
                            <td style="text-align: center">${currencySymbol} ${item.itemTotal.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            ${isLastPage ? `
            <div class="totals">
                <table>
                    <tr>
                        <td>GRAVADO</td>
                        <td>${currencySymbol} ${gravado.toFixed(2)}</td>
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
            ` : ''}

            ${footerBanksHTML}
        </div>
        
        ${!isLastPage ? '<div style="page-break-after: always;"></div>' : ''}
    `;
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
    
    // Resetear tabla de artículos - DEJAR VACÍA
    const itemsBody = document.getElementById('items-body');
    itemsBody.innerHTML = '';
    
    // CORREGIDO: Resetear bancos pero mantener los por defecto
    const bankContainer = document.getElementById('bank-accounts-container');
    bankContainer.innerHTML = '';
    bankCounter = 0;
    
    // Agregar bancos por defecto nuevamente
    DEFAULT_BANKS.forEach(bank => {
        addBank(bank);
    });
    
    // Restablecer fechas
    document.getElementById('quote-date').valueAsDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    document.getElementById('valid-until').valueAsDate = futureDate;
    
    // Restablecer selects
    document.getElementById('currency').value = 'PEN';
    document.getElementById('order-type').value = 'Entrega Inmediata';

    // Resetear datos del cliente
    document.getElementById('client-ruc').value = '';
    document.getElementById('client-name').value = '';
    document.getElementById('client-address').value = '';
    document.getElementById('client-district').value = '';
    document.getElementById('client-province').value = '';
    document.getElementById('client-department').value = '';
    
    // Habilitar campos del cliente
    disableClientFields(true);
    
    // Ocultar resultados de búsqueda
    document.getElementById('client-search-results').style.display = 'none';
}

// Función mejorada para confirmar y descargar
function confirmAndDownload() {
    if (confirm('¿Está seguro de que desea confirmar esta cotización y generar el PDF?')) {
        // Mostrar pantalla de impresión
        generatePrintView(quoteData);
        document.getElementById('preview-screen').classList.remove('active');
        document.getElementById('print-screen').classList.add('active');
        
        // Esperar a que se renderice y descargar
        setTimeout(() => {
            window.print();
            
            // Opcional: Mostrar mensaje de éxito
            setTimeout(() => {
                alert('PDF generado exitosamente');
                newQuote(); // Volver al formulario
            }, 1500);
        }, 800);
    }
}
















