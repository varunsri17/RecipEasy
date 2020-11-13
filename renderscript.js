export async function renderhome() {
    const root = $('#root');

    const users = await axios({
        method: 'get',
        url: 'http://localhost:3000/user',
        withCredentials: true,
    })
    console.log(users.data);
    $('#feed').empty();
    for (let i = 0; i < users.data.length; i++) {
        console.log(users.data[i]);
        const user = await axios({
            method: 'get',
            url: `http://localhost:3000/user/${users.data[i]}`,
            withCredentials: true,
        })
        console.log(user);
        $('#recipefeed').append(createRecipeView(user.data));
    }
}

export function createRecipeView(user) {
    console.log(user);
    let recipeview = `<div class="card m-3" id ="${user.id}">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">${user.firstName}</p>
                    <p class="subtitle is-6">@${user.lastName}</p>
                </div>
            </div>
            <div class="content">${user.diet}</div>
        </div>
        <footer class="card-footer">`
    recipeview += `</footer ></div >`
    return recipeview;
}

$(function () {
    renderhome();
});