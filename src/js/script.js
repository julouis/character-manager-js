console.log("wait async");

var template = document.querySelector("#template");
var target = document.querySelector("#target");

async function fetchData() {
	let response = await fetch("https://character-database.becode.xyz/characters");
	let data = await response.json();

	data.forEach(({ image, name, shortDescription, description, id}) => {
		const cloneHero = template.cloneNode(true).content;
		
		cloneHero.querySelector("#hero-name").innerHTML = `${name}`;
		cloneHero.querySelector("#hero-short-description").innerHTML = `${shortDescription}`;
		cloneHero.querySelector("#hero-description").innerHTML = `${description}`;
        cloneHero.querySelector("#hero-image").innerHTML = `<img src="data:image/gif;base64,${image}" width="200" height="200">`;
        
		// MODIFY FUNCTION
		
		cloneHero.querySelector("#modify-button");

		// DELETE FUNCTION
		cloneHero.querySelector("#delete-button").addEventListener("click", () => {
			console.log(id);
			const response = fetch(`https://character-database.becode.xyz/characters/${id}`, {
				method: "DELETE",
				headers: {
                    "Content-Type": "application/json",
				},
			});
			
		});

		

		target.appendChild(cloneHero); 

		/* cloneHero.getElementById("delete-button").addEventListener("click",async function (){
			console.log("test delete")
			const deleteID = delete data[id];
		}) */

    console.log(data)
    });
}


fetchData();

	// IMAGE TO URL
let image = ""
	document.querySelector("#hero-image-post").addEventListener("change",(e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			image = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
			console.log(image)
		};
		reader.readAsDataURL(file)
	});
	//
	

const inputs = Array.from(document.querySelectorAll(".modal-body input"));

document.getElementById("create-hero").addEventListener("click", async function() {

	const values = inputs.map(({value}) => value.trim());

	console.log(values)

	const [name, shortDescription, description] = values;


	const response = await fetch("https://character-database.becode.xyz/characters", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name,
			shortDescription,
			description,
			image
		})
		
	})
	
	document.location.reload();
	
	console.log(response.status)
	const newHero = await response.json();
	console.log(newHero)

})
