export async function renderhome() {
    const root = $('#root');

    /*const users = await axios({
        method: 'get',
        url: 'http://localhost:3000/user',
        withCredentials: true,
    })
    $('#feed').empty();
    for (let i = 0; i < 50; i++) {
        let user = users.data[i];
        $('#feed').append(createRecipeView(user));
    }*/
    const user = {id: 10, firstName: "alex", lastName: "dude", diet: "false"};
    $('#recipefeed').append(createRecipeView({user}));

}

export function createRecipeView(user) {
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