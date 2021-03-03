console.log("wait async");

var template = document.querySelector("#template");
var target = document.querySelector("#target");

async function fetchData() {
	let response = await fetch("https://character-database.becode.xyz/characters");
	let data = await response.json();

	data.forEach(({ image, name, shortDescription, description}) => {
		const cloneHero = template.cloneNode(true).content;
		
		cloneHero.querySelector("#hero-name").innerHTML = `NAME: ${name}`;
		cloneHero.querySelector("#hero-short-description").innerHTML = `SHORT DESCRITPION ${shortDescription}`;
		cloneHero.querySelector("#hero-description").innerHTML = `DESCRIPTION: ${description}`;
        cloneHero.querySelector("#hero-image").innerHTML = `IMAGE: <img src="data:image/gif;base64,${image}" width="200" height="200">`;
        target.appendChild(cloneHero); 

        console.log()
    });
}

fetchData();

const inputs = Array.from(document.querySelectorAll(".modal-body input"));

document.getElementById("create-hero").addEventListener("click", async function() {
	const values = inputs.map(({value}) => value.trim());

	const [name, shortDescription, description,image] = values;

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

	const newHero = await response.json();
	console.log(newHero)

})
