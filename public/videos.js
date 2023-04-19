const firebaseConfig = {
    apiKey: "AIzaSyASHm4DHXPNiem2nl25_Ax8jHHXRSVYC7A",
    authDomain: "programmerscornerph-2f1f9.firebaseapp.com",
    databaseURL: "https://programmerscornerph-2f1f9-default-rtdb.firebaseio.com",
    projectId: "programmerscornerph-2f1f9",
    storageBucket: "programmerscornerph-2f1f9.appspot.com",
    messagingSenderId: "1090743775951",
    appId: "1:1090743775951:web:fb6d67af58b66fbfd8bdba",
    measurementId: "G-BT751SCDZ2"
};
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

function searchVideos(event) {
    event.preventDefault(); // prevent default form submission

    const searchKeyword = document.getElementById('search-input').value;

    videosRef.get().then((doc) => {
        if (doc.exists) {
            const videoUrl = doc.data()[searchKeyword.toLowerCase()];
            if (videoUrl) {
                videoContainer.innerHTML = '';
                const video = document.createElement('iframe');
                video.width = '100%';
                video.height = '100%';
                video.src = videoUrl;
                video.title = 'YouTube video player';
                video.frameBorder = '0';
                video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                video.allowFullscreen = true;
                videoContainer.appendChild(video);

                showVideos(currentVideoPage);
            }
        }
    });
}

const videosPerPage = 1; // change this to set the number of videos to show per page
const videoContainer = document.getElementById('video-container');
const pagination = document.getElementById('pagination');
const videosRef = db.collection('videos').doc('javascript');
let currentVideoPage = 1;

function showVideos(page) {
    const startIndex = (page - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;

    videosRef.get().then((doc) => {
        if (doc.exists) {
            const videoData = doc.data();
            const videoKeys = Object.keys(videoData);
            const totalPages = Math.ceil(videoKeys.length / videosPerPage);
            const videoUrls = [];

            // Get the URLs of the videos to show on the current page
            for (let i = startIndex; i < endIndex && i < videoKeys.length; i++) {
                const videoKey = videoKeys[i];
                const videoUrl = videoData[videoKey];
                videoUrls.push(videoUrl);
            }

            // Update the video container with the videos to show on the current page
            videoContainer.innerHTML = '';
            videoUrls.forEach((videoUrl) => {
                const video = document.createElement('iframe');
                video.width = '100%';
                video.height = '100%';
                video.src = videoUrl;
                video.title = 'YouTube video player';
                video.frameBorder = '0';
                video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                video.allowFullscreen = true;
                videoContainer.appendChild(video);
            });

            // Update the pagination links
            pagination.innerHTML = '';

            if (totalPages <= 4) {
                for (let i = 1; i <= totalPages; i++) {
                    const pageNumber = document.createElement('a');
                    pageNumber.href = '#';
                    pageNumber.innerHTML = i;
                    if (i === page) {
                        pageNumber.classList.add('active');
                    }
                    pageNumber.addEventListener('click', () => {
                        currentVideoPage = i;
                        showVideos(currentVideoPage);
                    });
                    pagination.appendChild(pageNumber);
                }
            } else {
                const prevButton = document.createElement('a');
                prevButton.href = '#';
                prevButton.innerHTML = 'Prev';
                if (currentVideoPage === 1) {
                    prevButton.classList.add('disabled');
                } else {
                    prevButton.addEventListener('click', () => {
                        currentVideoPage = currentVideoPage - 1;
                        showVideos(currentVideoPage);
                    });
                }
                pagination.appendChild(prevButton);

                const firstPage = Math.max(1, currentVideoPage - 2);
                const lastPage = Math.min(totalPages, currentVideoPage + 2);

                for (let i = firstPage; i <= lastPage; i++) {
                    const pageNumber = document.createElement('a');
                    pageNumber.href = '#';
                    pageNumber.innerHTML = i;
                    if (i === currentVideoPage) {
                        pageNumber.classList.add('active');
                    }
                    pageNumber.addEventListener('click', () => {
                        currentVideoPage = i;
                        showVideos(currentVideoPage);
                    });
                    pagination.appendChild(pageNumber);
                }

                if (currentVideoPage < totalPages) {
                    const nextButton = document.createElement('a');
                    nextButton.href = '#';
                    nextButton.innerHTML = 'Next';
                    nextButton.addEventListener('click', () => {
                        currentVideoPage = currentVideoPage + 1;
                        showVideos(currentVideoPage);
                    });
                    pagination.appendChild(nextButton);
                } else {
                    const nextButton = document.createElement('a');
                    nextButton.href = '#';
                    nextButton.innerHTML = 'Next';
                    nextButton.classList.add('disabled');

                    pagination.appendChild(nextButton);

                }


            }

        }
    });
}
showVideos(currentVideoPage);