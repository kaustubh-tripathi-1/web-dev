//- Question 1

/* function processNumber(num, callback) {
    if (callback) {
        callback(num);
    }
}

processNumber(89, (num) => {
    if (num % 2 === 0) {
        console.log(`Even Number!`);
    } else {
        console.log(`Odd Number!`);
    }
}); */

//- Question 2

/* function checkPrime(num) {
    if (num <= 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function isPrime(num) {
    return new Promise((resolve, reject) => {
        if (typeof num !== `number` || isNaN(num)) {
            reject(`Input is not a valid number!`);
            return;
        }

        if (checkPrime(num)) {
            resolve(`Number is Prime!`);
        } else {
            reject(`Number is not Prime!`);
        }
    });
} */

/* isPrime(89)
    .then((result) => {
        console.log(`${result}`);
    })
    .catch((error) => {
        console.log(`${error}`);
    });

isPrime(88)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

isPrime(`idosa`)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    }); */

/* async function primePromise() {
    try {
        const response = await isPrime(89);
        console.log(response);
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

primePromise(); */

//- Question 3

/* function doubleNumber(num) {
    return new Promise((resolve, reject) => {
        if (typeof num !== `number` || isNaN(num)) {
            reject(`Input is not a valid number!`);
            return;
        } else {
            resolve(num * 2);
        }
    });
} */

//$ Manual Chaining
/* doubleNumber(2)
    .then((result) => {
        return result * 2;
    })
    .then((result) => {
        return result * 2;
    })
    .then((result) => {
        return result * 2;
    })
    .then((result) => {
        console.log(`Result is ${result}`);
    })
    .catch((error) => {
        console.log(error);
    }); */

//$ Dynamic Chaining

/* const num = 2;

const iterations = 4;

let promise = Promise.resolve(num);

for (let i = 0; i < iterations; i++) {
    promise = promise.then(doubleNumber);
}

promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }); */

//- Question 4

/* const promise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(`Resolved after 1 second.`);
    }, 1000);
});
const promise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(`Resolved after 2 seconds.`);
    }, 2000);
});
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(`Rejected after 3 second.`);
    }, 3000);
});

//$ Promise.allSettled() processes all promises, regardless of rejection, and reports their status.
Promise.allSettled([promise1, promise2, promise3]).then((results) => {
    console.log(`Results of the promises :\n`);
    results.forEach((result, index) => {
        // console.log(`Promise ${index + 1} : `, result); //& W/O template literal
        console.log(`Promise ${index + 1} : ${JSON.stringify(result)}`); //& Inside the template literal, result is not converted to readable format with implicit .toStrin(), instead use JSON.stringify() to convert the object to readable string
    });
}); */

//$ Promise.all(), stops as soon as a rejection occurs and no .then() is executed and throws the specified error in the rejected promise.
/* Promise.all([promise1, promise2, promise3])
    .then((results) => {
        console.log("All promises resolved:", results);
    })
    .catch((error) => {
        console.error("One or more promises rejected:", error);
    }); */

//- Question 5

/* async function waitAndLog() {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
            console.log(`Done Waiting!`);
        }, 2000);
    });
}

waitAndLog(); */

//- Question 6

/* const userObj = {
    name: `Kaustubh`,
    id: 69,
    posts: 101,
};

async function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === userObj.id) resolve(userObj);
            else reject(`User not found!`);
        }, 2000);
    });
}

async function fetchPosts(userID) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userID === userObj.id) {
                resolve(userObj.posts); // Resolve posts if the user ID matches
            } else {
                reject("Posts not found for the user!"); // Reject if no posts found for the user
            }
        }, 2000);
    });
} */

//$ Using async/await
/* async function logIDAndPost() {
    try {
        const user = await fetchUser(69);
        console.log(`Fetched User ID`);
        const posts = await fetchPosts(user.id);
        console.log(`Fetched User Posts`);

        console.log(`User : ${JSON.stringify(user)}`);
        console.log(`User ID : ${user[`id`]}`);
        console.log(`User Posts : ${posts}`);
    } catch (error) {
        console.log(error);
    }
}

logIDAndPost(); */

//$ Using .then
/* fetchUser(69)
    .then((user) => {
        console.log(`User : ${JSON.stringify(user)}`);
        console.log(`User ID : ${user[`id`]}`);
        return user[`id`];
    })
    .then((userID) => {
        console.log(userID);
        return fetchPosts(userID);
    })
    .then((posts) => {
        console.log(`User Posts : ${posts}`);
    })
    .catch((error) => {
        console.log(error);
    }); */

//- Question 7

/* async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(response);
            throw new Error(`Error : ${response.status}`);
        }

        const responseJSON = await response.json();

        console.log(responseJSON);
    } catch (error) {
        console.error(error);
        console.error(error.message);
    }
}

fetchData("https://invalid.url"); // Invalid URL for testing
fetchData("https://api.github.com/users/kaustubh-tripathi-1"); // Valid URL */

//- Question 8

// const url = `https://jsonplaceholder.org/users`;

//$ Somewhat Inefficient
/* function renderDataToTable(users) {
    const table = document.createElement(`table`);
    const body = document.querySelector(`body`);
    let row1 = document.createElement(`tr`);
    let tableHeading1 = document.createElement(`th`);
    let tableHeading2 = document.createElement(`th`);
    let tableHeading3 = document.createElement(`th`);

    tableHeading1.textContent = `Name`;
    tableHeading2.textContent = `Email`;
    tableHeading3.textContent = `Address`;
    row1.append(tableHeading1);
    row1.append(tableHeading2);
    row1.append(tableHeading3);
    table.append(row1);

    for (let i = 0; i < users.length; i++) {
        let row = document.createElement(`tr`);
        let tableData1 = document.createElement(`td`);
        let tableData2 = document.createElement(`td`);
        let tableData3 = document.createElement(`td`);
        tableData1.textContent = `${users[i][`firstname`]} ${
            users[i][`lastname`]
        }`;
        tableData2.textContent = `${users[i][`email`]}`;
        tableData3.textContent = `${users[i][`address`][`street`]}, 
                                    ${users[i][`address`][`city`]},
                                    ${users[i][`address`][`zipcode`]} `;

        row.append(tableData1);
        row.append(tableData2);
        row.append(tableData3);

        table.append(row);
    }
    body.prepend(table);
} */

//$ Using innerHTML

/* function renderDataToTable(users) {
    const body = document.querySelector(`body`);
    const table = document.createElement(`table`);

    const headers = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
            </tr>
        </thead>
        `;
    table.innerHTML = headers;

    users.forEach((user) => {
        const row = `<td>
                        ${user[`firstname`]} ${user[`lastname`]}
                    </td>
                    <td>
                        ${user[`email`]}
                    </td>
                    <td>
                        ${user.address.street},
                        ${user.address.city},
                        ${user.address.zipcode}
                    </td>`;
        // ${user[`address`][`street`]},
        //${user[`address`][`city`]},
        //${user[`address`][`zipcode`]}
        table.innerHTML += row;
    });

    table.innerHTML += `<tfoot>
                        <tr>
                            <td colspan="3" id="total">Total: ${users.length} users</td>
                        </tr>
                    </tfoot>`;

    body.prepend(table);
}

async function fetchData(url) {
    try {
        const data = await fetch(url);
        if (!data.ok) {
            throw new Error(`${data.status} - ${data.statusText}`);
        }

        const users = await data.json();

        console.log(users);

        renderDataToTable(users);
    } catch (error) {
        console.error(error);
    }
}

fetchData(url); */

//- Question 9

/* async function fetchDataSequentially() {
    try {
        const response1 = await fetch(`https://jsonplaceholder.org/users`);

        if (!response1.ok) {
            throw new Error(`${response1.status} - ${response1.statusText}`);
        }

        const users = await response1.json();

        const response2 = await fetch(`https://jsonplaceholder.org/posts`);
        if (!response2.ok) {
            throw new Error(`${response2.status} - ${response2.statusText}`);
        }

        const posts = await response2.json();

        const filteredPosts = posts.filter((post) => {
            return users.some((user) => {
                return post.userId === user.id;
            });
        });

        // const filteredPosts = posts.filter((post) =>
        //     users.some((user) => user.id === post.userId)
        // );

        console.log("Users:", users);
        console.log("Posts belonging to users:", filteredPosts);
    } catch (error) {
        console.error(error);
    }
}

fetchDataSequentially(); */

//- Question 10

/* let page = 1;
const button = document.querySelector(`#next`);
const postContainer = document.querySelector(`#posts`);

async function fetchNextPage() {
    try {
        console.log(page);

        let url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;

        console.log(url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }

        const posts = await response.json();

        console.log(`Post ${page} :`, posts);

        posts.forEach((post) => {
            const div = document.createElement(`div`);
            div.textContent = `Post ${post.id}: ${post.title}`;
            postContainer.append(div);
        });

        page++;
    } catch (error) {
        console.error(error);
        alert(`Failed to fetch data!`);
    }
}

//$ Actual Click
button.addEventListener(`click`, fetchNextPage); */

// fetchNextPage();

//$ Another JSONPlaceHolder which allows query parameter
/* let page = 1; // Start from page 1
const button = document.querySelector(`#next`);
const postsContainer = document.querySelector(`#posts`);

async function fetchNextPage() 
{
    try 
    {
        const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`; // Use proper query params for pagination.

        console.log(`Fetching page: ${page}`);
        console.log(`URL: ${url}`);

        const response = await fetch(url);

        if (!response.ok) 
        {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const posts = await response.json();

        // Log the fetched posts and update the UI
        console.log(`Posts on page ${page}:\n`, posts);

        // Clear old posts and append new ones
        posts.forEach((post) => 
        {
            const postElement = document.createElement(`div`);
            postElement.textContent = `Post ${post.id}: ${post.title}`;
            postsContainer.appendChild(postElement);
        });

        // Increment page for the next fetch
        page++;
    } 
    catch (error) 
    {
        console.error(error);
        alert(`Failed to fetch posts. Please try again.`);
    }
}

// Add event listener to fetch next page on button click
button.addEventListener(`click`, fetchNextPage);

// Optionally simulate a button click by calling the function directly for testing
// fetchNextPage(); */

//- Question 11

//$ async/await
/* async function fetchWithRetry(url, retries) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            } else {
                const data = await response.json();

                return data;
            }
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);

            if (attempt === retries) {
                throw new Error(`All ${retries} attempts failed.`);
            }
        }
    }
} */

//$ Promise Chains
/* async function fetchWithRetry(url, retries) {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .catch((error) => {
            if (retries > 1) {
                console.log(`Retrying... ${retries - 1} Retries Left`);
                return fetchWithRetry(url, retries - 1);
            } else {
                throw new Error(`All Retries failed! : ${error.message}`);
            }
        });
}

fetchWithRetry("https://jsonplaceholder.org/users", 3)
    .then((data) => {
        console.log("Fetched data:", data);
    })
    .catch((error) => {
        console.error("Fetch failed:", error.message);
    }); */

//- Question 12

/* const urls = [
    `https://jsonplaceholder.typicode.com/todos/1`,
    `https://jsonplaceholder.typicode.com/todos/2`,
    `https://jsonplaceholder.typicode.com/todos/3`,
    `https://jsonplaceholder.typicode.com/todos/4`,
    `https://jsonplaceholder.typicode.com/todos/5`,
    `https://jsonplaceholder.typicode.com/todos/6`,
    `https://jsonplaceholder.typicode.com/todos/7`,
    `https://jsonplaceholder.typicode.com/todos/8`,
    `https://jsonplaceholder.typicode.com/todos/9`,
    `https://jsonplaceholder.typicode.com/todos/10`,
];

//$ Helper function to track promise statuses
function trackPromise(promise) {
    let status = `pending`;

    const trackedPromise = promise.then(
        (value) => {
            status = `fulfilled`;
            return value;
        },
        (error) => {
            status = `rejected`;
            throw error;
        }
    );

    trackedPromise.status = () => status; //& Add a status method to check the status dynamically

    return trackedPromise;
}

//$ Implements concurrency using queue and limits the concurrent fetched upto 3
async function fetchConcurrently(urls, limit = 3) {
    const queue = [...urls]; //& Clone the input array to avoid modifying it
    const results = [];
    let workers = [];

    //& Fetches data from each URL
    async function fetchWorker(url) {
        try {
            console.log(`Fetching: ${url}`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `Error fetching ${url}: ${response.status}, ${response.statusText}`
                );
            }
            const data = await response.json();

            results.push(data); //& Store the result
            console.log(`Fetched: ${url}`);
        } catch (error) {
            console.error(error);
        }
    }

    while (queue.length > 0 || workers.length > 0) {
        //& Start workers if within the limit
        while (workers.length < limit && queue.length > 0) {
            const url = queue.shift(); //& Get and remove the first URL

            const worker = trackPromise(fetchWorker(url)); //& Use trackPromise to track the worker
            console.log(`Worker check - `, worker);

            workers.push(worker); //& Add the worker to the array
        }

        //& Wait for the first worker to complete
        await Promise.race(workers);
        console.log(`check - `, workers);

        //& Remove completed workers
        workers = workers.filter((w) => w.status() !== `fulfilled`);
    }
    return results; //& Return all fetched results
}

(async () => {
    const results = await fetchConcurrently(urls, 3);
    console.log(`Fetched results :`, results);
})(); */

//- Question 13

/* function uploadFile(file) {
    return new Promise((resolve, reject) => {
        const uploadTime = Math.floor(Math.random() * 5) + 1;
        console.log(
            `Uploading File ${file}, Estimated upload time - ${uploadTime}`
        );

        setTimeout(() => {
            if (uploadTime <= 4) {
                resolve(`File - ${file} uploaded successfully!`);
            } else {
                reject(`File - ${file} upload failed.`);
            }
        }, uploadTime * 1000);
    });
}

const files = [`file1`, `file2`, `file3`, `file4`, `file5`];

async function uploadFilesConcurrently() {
    const promises = files.map((file) => uploadFile(file));

    const results = await Promise.allSettled(promises); //& Returns an array of promise objects where each value corresponds to a promise from the input array.
    console.log(results);

    results.forEach((result) => {
        if (result.status === `fulfilled`) {
            console.log(result.value);
        } else {
            console.error(result.reason);
        }
    });
}

uploadFilesConcurrently(); */

//- Question 14

/* async function fetchPostByID(postID) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postID}`
    );

    if (!response.ok) {
        throw new Error(
            `Error fetching post : ${response.status} - ${response.statusText}.`
        );
    }

    return response.json();
}
async function fetchCommentByID(postID) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postID}/comments`
    );

    if (!response.ok) {
        throw new Error(
            `Error fetching post : ${response.status} - ${response.statusText}.`
        );
    }

    return response.json();
}

(async function dependentFetch(postID) {
    try {
        const post = await fetchPostByID(postID);
        console.log(`Fetched Post :`, post);
        const comments = await fetchCommentByID(postID);
        console.log(`Fetched Comments :`, comments);

        console.log(`Post -`, post, `Comment - `, comments);
    } catch (error) {
        console.error(error.message);
    }
})(1); */

//- Question 17
