import React from 'react'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    function logout() {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }
    return (
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="/home">Hotel Capital</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-5">
                    {user ? (<>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {user.name}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="profile">プロファイル</a>
                                <a class="dropdown-item" href="#" onClick={logout}>ログアウト</a>
                            </div>
                        </div>
                    </>) : (<>
                        <li class="nav-item active">
                            <a class="nav-link" href="/register">
                                サインアップ
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login">
                                ログイン
                            </a>
                        </li>
                    </>)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar


