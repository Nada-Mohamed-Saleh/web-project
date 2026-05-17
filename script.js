function addToCart(name, price) {
  const msg =`${name} — LE ${price.toFixed(2)} EGP added to cart.`;
  
  showToast(msg);
}

function showToast(text) {
  let t = document.createElement('div');
  t.textContent = text;
  t.style.position = 'fixed';
  t.style.right = '18px';
  t.style.bottom = '18px';
  t.style.background = 'rgba(0,0,0,0.8)';
  t.style.color = 'white';
  t.style.padding = '10px 14px';
  t.style.borderRadius = '8px';
  t.style.zIndex = '1000';
  t.style.boxShadow = '0 6px 18px rgba(0,0,0,0.2)';
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 2200);
}

function openMenu(){
 const sidebar=document.querySelector('.sidebar');
 sidebar.style.display='flex';
}
function closeMenu(){
   const sidebar=document.querySelector('.sidebar');
   sidebar.style.display='none';
}
function opencart(){
    const cart=document.querySelector('.cart');
    cart.style.visibility='visible';
}
function closecart(){
    const cart=document.querySelector('.cart');
    cart.style.visibility='hidden';
}
function openSearch(){
    const search=document.querySelector('#searchBox');
    search.style.visibility='visible';
}
function closeSearch(){
    const search=document.querySelector('#searchBox');
    search.style.visibility='hidden';
}

const searchInput=document.getElementById('searchInput');
searchInput.onkeyup= ()=>{
  const value=searchInput.value.toLowerCase();
  const products=document.querySelectorAll(".product-card");
  products.forEach( product => {
    product.style.display=product.textContent.toLowerCase().includes(value)
    ? "block"
    : "none";
  });
};

function showProducts(){
  document.querySelectorAll(".product-card").forEach( p =>{
    p.style.display="block";
  });
}

let cart=JSON.parse(localStorage.getItem("cart")) || [];
updateCart();
updateCartCount();
updateTotalPrice();

function saveCart(){
  localStorage.setItem("cart",JSON.stringify(cart));
}

function addedToCart(name,price,image){
  let existing=cart.find(item => item.name===name);
  if(existing){
    existing.quantity++;
  }
  else{
   cart.push({
  name: name,
  price: price,
  image: image,
  quantity:1
   });
 }
 updateCart();
 updateCartCount();
 updateTotalPrice();
 saveCart();
}

function updateCart(){
  let cartItems=document.getElementById("cart-items");
  cartItems.innerHTML="";
  cart.forEach(item => {
    let li=document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML=`
    <img src="${item.image}" width="100" style="border-radius: 8px;" class="cart-img">
    <div class="cart-item-info">
    <h4>${item.name}</h4>
    <p>LE ${item.price} EGP</p>
    </div>
    <button class="q-btn" onclick="changeQty('${item.name}',-1)">-</button>
    <span>${item.quantity}</span>
    <button class="q-btn" onclick="changeQty('${item.name}',1)">+</button>
    <img src="pics/trash-bin_10274454.png" class="trash-btn" width="30" onclick="removeItem('${item.name}')">
    <br><br><br>
    `;
    cartItems.appendChild(li);
  });
}

function changeQty(name,change){
  let item=cart.find(i => i.name === name);
  if(!item) return;
  item.quantity+=change;
  if(item.quantity <= 0){
    cart=cart.filter(i => i.name !== name);
  }
  updateCart();
  updateCartCount();
  updateTotalPrice();
  saveCart();
}

function updateCartCount(){
  let totalCount=cart.reduce((sum,item) => sum + item.quantity,0);
  document.getElementById("cartcount").innerText=totalCount;
}

function updateTotalPrice(){
  let total=cart.reduce((sum,item)=> sum + item.price * item.quantity,0);
  document.getElementById("total-price").innerText=total;
}

function removeItem(name){
  cart=cart.filter(item => item.name !== name);
  updateCart();
  updateCartCount();
  updateTotalPrice();
  saveCart();
}


const form=document.getElementById("loginForm");
    const email=document.getElementById("email");
    const password=document.getElementById("password");
    const toggle=document.getElementById("togglePw");
    const strengthBar=document.getElementById("strengthBar");
    const emailHelp=document.getElementById("emailHelp");
    const passwordHelp=document.getElementById("passwordHelp");
    const formMsg=document.getElementById("formMsg");
    const emailWrap=document.getElementById("emailWrap");
    const pwWrap=document.getElementById("pwWrap");

    function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
    function pwScore(p){
      let s=0;
      if(p.length>=8)s++;
      if(/[A-Z]/.test(p)&&/[a-z]/.test(p))s++;
      if(/[0-9]/.test(p))s++;
      if(/[^A-Za-z0-9]/.test(p))s++;
      return Math.min(s,3);
    }

    function updateStrength(){
      const s=pwScore(password.value);
      if(password.value.length===0){
        strengthBar.style.width="0%";
        strengthBar.className="";
        return;
      }
      if(s<=1){
        strengthBar.style.width="30%";
        strengthBar.className="s-weak";
      } else if(s===2){
        strengthBar.style.width="65%";
        strengthBar.className="s-medium";
      } else {
        strengthBar.style.width="100%";
        strengthBar.className="s-strong";
      }
    }

    toggle.onclick=()=>{
      if(password.type==="password"){
        password.type="text";
        toggle.textContent="Hide";
      } else {
        password.type="password";
        toggle.textContent="Show";
      }
    };

    email.oninput=()=>{
      emailWrap.classList.remove("invalid");
      if(email.value.trim()===""){
        emailHelp.style.display="none";
        return;
      }
      if(!validEmail(email.value)){
        emailHelp.style.display="block";
        emailHelp.textContent="Invalid email format";
      } else {
        emailHelp.style.display="none";
      }
    };

    password.oninput=()=>{
      pwWrap.classList.remove("invalid");
      passwordHelp.style.display="none";
      updateStrength();
    };

    function showFormMessage(type,msg){
      formMsg.className="";
      formMsg.style.display="block";
      if(type==="success"){
        formMsg.classList.add("success");
        formMsg.textContent=msg;
      } else {
        formMsg.classList.add("error");
        formMsg.textContent=msg;
      }
      setTimeout(()=>{formMsg.style.display="none";},4000);
    }

    form.addEventListener("submit",(e)=>{
      e.preventDefault();

      emailHelp.style.display="none";
      passwordHelp.style.display="none";
      emailWrap.classList.remove("invalid");
      pwWrap.classList.remove("invalid");

      const em=email.value.trim();
      const pw=password.value;

      if(em===""||pw===""){
        if(em===""){
          emailHelp.style.display="block";
          emailHelp.textContent="This field is required";
          emailWrap.classList.add("invalid");
        }
        if(pw===""){
          passwordHelp.style.display="block";
          passwordHelp.textContent="This field is required";
          pwWrap.classList.add("invalid");
        }
        showFormMessage("error","Please fill in the required fields.");
        return;
      }

      if(!validEmail(em)){
        emailHelp.style.display="block";
        emailHelp.textContent="Invalid email format";
        emailWrap.classList.add("invalid");
        showFormMessage("error","Please fix the errors and try again.");
        return;
      }

      if(pw.length<8){
        passwordHelp.style.display="block";
        passwordHelp.textContent="Password must be at least 8 characters";
        pwWrap.classList.add("invalid");
        showFormMessage("error","Please fix the errors and try again.");
        return;
      }

      showFormMessage("success","Login successful");
    });

    
