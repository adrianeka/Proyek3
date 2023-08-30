const membersData = [
    { name: "Nama 1", image: "user.png", username: "user1234" },
    { name: "Nama 2", image: "user.png", username: "user1235" },
    { name: "Nama 3", image: "user.png", username: "user1236" },
    { name: "Nama 4", image: "user.png", username: "user1237" },
    { name: "Nama 5", image: "user.png", username: "user1238" },
    { name: "Nama 6", image: "user.png", username: "user1239" },
];

const friendsData = [
    { name: "Nama 7", image: "user.png", username: "user1240" },
];

document.addEventListener("DOMContentLoaded", function () {
    const memberCardsContainer = document.getElementById("memberContainer")
    const friendCardsContainer = document.getElementById("friendContainer")
    const friendCountElement = document.getElementById("totalTeman")

    function createMemberCard(member){
        const card = document.createElement("div");

        const cardContent = `
            <div class="card mb-3" style="max-width: 700px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${member.image}" class="img-fluid rounded-start" alt="${member.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div class="d-flex">
                                <h5 class="card-nama">${member.name}</h5>
                                <button class="btn btn-primary ms-auto btn-follow">Follow</button>
                            </div>
                            <p class="card-text">@${member.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        card.innerHTML = cardContent;
        memberCardsContainer.appendChild(card);

        const followButton = card.querySelector(".btn-follow");
        followButton.addEventListener("click", function () {
            followMember(member);
        });
    }

    function createFriendCard(friend) {
        const card = document.createElement("div");

        const cardContent = `
            <div class="card mb-3" style="max-width: 700px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${friend.image}" class="img-fluid rounded-start" alt="${friend.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div class="d-flex">
                                <h5 class="card-nama">${friend.name}</h5>
                                <button class="btn btn-danger ms-auto btn-unfollow">Unfollow</button>
                            </div>
                            <p class="card-text">@${friend.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        card.innerHTML = cardContent;
        friendCardsContainer.appendChild(card);

        const unfollowButton = card.querySelector(".btn-unfollow");
        unfollowButton.addEventListener("click", function () {
            unfollowFriend(friend);
        });
    }

    function followMember(member) {
        const index = membersData.findIndex(m => m.username === member.username);
        if (index !== -1) {
            const followedMember = membersData.splice(index, 1)[0];
            friendsData.push(followedMember);

            // Perbarui tampilan
            displayMembers();
            displayFriends();
            friendCount();
        }
    }

    function unfollowFriend(friend) {
        const index = friendsData.findIndex(f => f.username === friend.username);
        if (index !== -1) {
            const unfollowedFriend = friendsData.splice(index, 1)[0];
            membersData.push(unfollowedFriend);

            // Perbarui tampilan
            displayMembers();
            displayFriends();
            friendCount();
        }
    }
    function friendCount() {
        friendCountElement.textContent = friendsData.length; // Update isi elemen jumlah teman
    }
    function displayMembers() {
        memberCardsContainer.innerHTML = "";
        membersData.forEach((member) => {
            createMemberCard(member);
        });
    }

    function displayFriends() {
        friendCardsContainer.innerHTML = "";
        friendsData.forEach((friend) => {
            createFriendCard(friend);
        });
    }

    // Pertama-tama, tampilkan anggota dan teman
    displayMembers();
    displayFriends();
    friendCount();
});
