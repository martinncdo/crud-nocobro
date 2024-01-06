async function getEntrevistas() {
    try {
        
            let res = await fetch("http://192.168.0.177:8000/entrevistas", {
            credentials: "include"
            });
            let json = await res.json();
            console.log(json);
       
    }catch(err) {
        console.log(err);
    };
};

getEntrevistas();

