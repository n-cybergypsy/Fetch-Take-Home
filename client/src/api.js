export async function getFavorites(userId){
    const response = fetch(`http://localhost:3001/favorites/${userId}`, {
    })
    return response;
}

export async function addToFavorites(userId, dogId){
    try {
        const body = {"user_id": userId, "dog_id": dogId}
        const response = await fetch("http://localhost:3001/favorites", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.error(error.message);
    }
}

export async function removeFromFavorites(userId, dogId){
    try {
        const body = {"user_id": userId, "dog_id": dogId}
        const response = await fetch("http://localhost:3001/favorites", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.error(error.message);
    }
}

export async function createUser(name, email){
    try {
        const body = {"user_name": name, "user_email": email}
        const response = await fetch("http://localhost:3001/user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        return response.json()
    } catch (error) {
        console.error(error.message);
    }
}

//get user id
export async function getUserId(email){
    try {
        const response = await fetch(`http://localhost:3001/user/${email}`)
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error.message);
    }
}

//Get all users
export async function getUsers(){
    try {
        const response = await fetch("http://localhost:3001/users")
        return response.json();
    } catch (error) {
        console.error(error.message);
    }
}

// //Get all favorites from user
// export async function getUserFaves(userId){
//     try {
//         const response = await fetch(`http://localhost:3001/favorites/${userId}`)
//         return response;
//     } catch (error) {
//         console.error(error.message);
//     }
// }

const fetchURL = "https://frontend-take-home-service.fetch.com";

export async function loginUser(userData){
    const response = fetch(fetchURL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(userData)),
        credentials: "include",
    })
  return response
}

export async function getDogsWithIds(dogIds) {
    const response = fetch(fetchURL + "/dogs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogIds),
    })
    return response
}

export async function getMatch(dogIds) {
    const response = fetch(fetchURL + "/dogs/match", {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(dogIds),
    })
    return response
}

export async function getBreedList(dogIds) {
    const response = fetch(fetchURL + "/dogs/breeds", {
        method: "GET",
        credentials: "include",
    })
    return response
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error(response.status);
    //   }
    //   return response.json();
    // })
    // .then((data) => {
    //   setDogBreeds(data);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
}


export async function getNearbyLocations(city){
    const response = fetch(fetchURL + "/locations/search", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"city":city}),
    })
    return response
}

//Gets Ids of all dogs without any filtering
export async function getAllDogIds(order){
    const response = fetch(fetchURL + "/dogs/search?sort=breed:"+order, {
        method: "GET",
        credentials: "include",
    })
    return response
}

//Gets Ids of dogs that fit filter criteria
export async function getDogIdsByCriteria(breedCriteria, searchCriteria, order){
    // if (criteria.type == "breeds") {
    //     const response = fetch(
    //         fetchURL +
    //         "/dogs/search?" +
    //         new URLSearchParams({
    //             breeds: criteria.res,
    //         }).toString(),
    //         {
    //         method: "GET",
    //         credentials: "include",
    //         }
    //     )
    //     return response
    // } else if (criteria.type == "search"){
    //     const searchParams = new URLSearchParams();
    //     const zipCodeArr = Object.entries(criteria.res);
    //     for (let [key, value] of zipCodeArr) {
    //         searchParams.append("zipCodes", value)
    //     }
    //     const response = fetch(
    //         fetchURL +
    //             "/dogs/search?sort=breed:" + order + "&" +
    //             searchParams.toString(),
    //         {
    //             method: "GET",
    //             credentials: "include",
    //         }
    //     )
    //     return response
    // }
    if (breedCriteria == "" && Object.keys(searchCriteria) == 0) {
        const response = fetch(fetchURL + "/dogs/search?sort=breed:"+order, {
            method: "GET",
            credentials: "include",
        })
        return response
    } else {

        let filterFetchURL = fetchURL + "/dogs/search?sort=breed:" + order;
        if (!(breedCriteria == "")) {
            const breedParams = new URLSearchParams({
                breeds: breedCriteria,
            }).toString()
            filterFetchURL += "&" + breedParams;
        }

        if (!(Object.keys(searchCriteria).length == 0) && !searchCriteria.res.length == 0) {
            const searchParams = new URLSearchParams();
            const zipCodeArr = Object.entries(searchCriteria.res);
            for (let [key, value] of zipCodeArr) {
                searchParams.append("zipCodes", value)
            }
            filterFetchURL += "&" + searchParams.toString()
        }

        const response = fetch(
            filterFetchURL,
            {
                method: "GET",
                credentials: "include",
            }
        )
        return response
    }
}