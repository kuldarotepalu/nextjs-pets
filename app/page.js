import Link from "next/link"
import clientPromise from "../lib/mongodb"
import PetsListSection from "../lib/PetsListSection"

async function getData() {
  const client = await clientPromise
  const pets = await client.db().collection("pets").find().toArray()

  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()

  const temperature = weatherData.properties.periods[0].temperature

  return { pets, temperature }
}

const HomePage = async () => {
  const { pets, temperature } = await getData()

  pets.map(pet => {
    pet._id = pet._id.toString()
    return pet
  })

  return (
    <>
      <div className="top-section-wrapper">
        <div className="top-section">

          <div className="actual-top-content">
            <h1>Find Your New Bestie</h1>
            <p className="intro-text">The most amazing list of adoptable pets at your fingertips. Updated fresh daily!</p>
            <div className="intro-buttons">
              <Link href="#view-pets" className="our-btn utility-mr">View Pets</Link>
              <Link href="/admin" className="our-btn our-btn--outline">Manage Pets</Link>
            </div>

            <div className="intro-features">
              <div className="intro-feature">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_15_6)">
                    <path
                      d="M24 33C21.6131 33 19.3239 32.0518 17.636 30.364C15.9482 28.6761 15 26.3869 15 24C15 21.6131 15.9482 19.3239 17.636 17.636C19.3239 15.9482 21.6131 15 24 15C26.3869 15 28.6761 15.9482 30.364 17.636C32.0518 19.3239 33 21.6131 33 24C33 26.3869 32.0518 28.6761 30.364 30.364C28.6761 32.0518 26.3869 33 24 33ZM24 36C27.1826 36 30.2348 34.7357 32.4853 32.4853C34.7357 30.2348 36 27.1826 36 24C36 20.8174 34.7357 17.7652 32.4853 15.5147C30.2348 13.2643 27.1826 12 24 12C20.8174 12 17.7652 13.2643 15.5147 15.5147C13.2643 17.7652 12 20.8174 12 24C12 27.1826 13.2643 30.2348 15.5147 32.4853C17.7652 34.7357 20.8174 36 24 36ZM24 0C24.3978 0 24.7794 0.158035 25.0607 0.43934C25.342 0.720644 25.5 1.10218 25.5 1.5V7.5C25.5 7.89782 25.342 8.27936 25.0607 8.56066C24.7794 8.84196 24.3978 9 24 9C23.6022 9 23.2206 8.84196 22.9393 8.56066C22.658 8.27936 22.5 7.89782 22.5 7.5V1.5C22.5 1.10218 22.658 0.720644 22.9393 0.43934C23.2206 0.158035 23.6022 0 24 0ZM24 39C24.3978 39 24.7794 39.158 25.0607 39.4393C25.342 39.7206 25.5 40.1022 25.5 40.5V46.5C25.5 46.8978 25.342 47.2794 25.0607 47.5607C24.7794 47.842 24.3978 48 24 48C23.6022 48 23.2206 47.842 22.9393 47.5607C22.658 47.2794 22.5 46.8978 22.5 46.5V40.5C22.5 40.1022 22.658 39.7206 22.9393 39.4393C23.2206 39.158 23.6022 39 24 39ZM48 24C48 24.3978 47.842 24.7794 47.5607 25.0607C47.2794 25.342 46.8978 25.5 46.5 25.5H40.5C40.1022 25.5 39.7206 25.342 39.4393 25.0607C39.158 24.7794 39 24.3978 39 24C39 23.6022 39.158 23.2206 39.4393 22.9393C39.7206 22.658 40.1022 22.5 40.5 22.5H46.5C46.8978 22.5 47.2794 22.658 47.5607 22.9393C47.842 23.2206 48 23.6022 48 24ZM9 24C9 24.3978 8.84196 24.7794 8.56066 25.0607C8.27936 25.342 7.89782 25.5 7.5 25.5H1.5C1.10218 25.5 0.720644 25.342 0.43934 25.0607C0.158035 24.7794 0 24.3978 0 24C0 23.6022 0.158035 23.2206 0.43934 22.9393C0.720644 22.658 1.10218 22.5 1.5 22.5H7.5C7.89782 22.5 8.27936 22.658 8.56066 22.9393C8.84196 23.2206 9 23.6022 9 24ZM40.971 7.029C41.2522 7.31029 41.4102 7.69175 41.4102 8.0895C41.4102 8.48725 41.2522 8.86871 40.971 9.15L36.729 13.395C36.5895 13.5343 36.424 13.6447 36.2419 13.72C36.0597 13.7953 35.8645 13.834 35.6674 13.8338C35.2694 13.8336 34.8878 13.6752 34.6065 13.3935C34.4672 13.254 34.3568 13.0885 34.2815 12.9064C34.2062 12.7242 34.1675 12.529 34.1677 12.3319C34.1679 11.9339 34.3263 11.5523 34.608 11.271L38.85 7.029C39.1313 6.74779 39.5128 6.58982 39.9105 6.58982C40.3082 6.58982 40.6897 6.74779 40.971 7.029ZM13.392 34.608C13.6732 34.8893 13.8312 35.2708 13.8312 35.6685C13.8312 36.0662 13.6732 36.4477 13.392 36.729L9.15 40.971C8.8671 41.2442 8.48819 41.3954 8.0949 41.392C7.7016 41.3886 7.32538 41.2308 7.04727 40.9527C6.76916 40.6746 6.61141 40.2984 6.60799 39.9051C6.60457 39.5118 6.75576 39.1329 7.029 38.85L11.271 34.608C11.5523 34.3268 11.9338 34.1688 12.3315 34.1688C12.7292 34.1688 13.1107 34.3268 13.392 34.608ZM40.971 40.971C40.6897 41.2522 40.3082 41.4102 39.9105 41.4102C39.5128 41.4102 39.1313 41.2522 38.85 40.971L34.608 36.729C34.3348 36.4461 34.1836 36.0672 34.187 35.6739C34.1904 35.2806 34.3482 34.9044 34.6263 34.6263C34.9044 34.3482 35.2806 34.1904 35.6739 34.187C36.0672 34.1836 36.4461 34.3348 36.729 34.608L40.971 38.85C41.2522 39.1313 41.4102 39.5128 41.4102 39.9105C41.4102 40.3082 41.2522 40.6897 40.971 40.971ZM13.392 13.395C13.1107 13.6762 12.7292 13.8342 12.3315 13.8342C11.9338 13.8342 11.5523 13.6762 11.271 13.395L7.029 9.15C6.88573 9.01163 6.77146 8.84611 6.69285 8.66311C6.61423 8.4801 6.57286 8.28327 6.57112 8.0841C6.56939 7.88493 6.60735 7.68741 6.68277 7.50307C6.75819 7.31872 6.86957 7.15125 7.01041 7.01041C7.15125 6.86957 7.31872 6.75819 7.50307 6.68277C7.68741 6.60735 7.88493 6.56939 8.0841 6.57112C8.28327 6.57286 8.4801 6.61423 8.66311 6.69285C8.84611 6.77146 9.01163 6.88573 9.15 7.029L13.392 11.271C13.5317 11.4103 13.6425 11.5759 13.7181 11.7581C13.7938 11.9403 13.8327 12.1357 13.8327 12.333C13.8327 12.5303 13.7938 12.7257 13.7181 12.9079C13.6425 13.0901 13.5317 13.2557 13.392 13.395Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_15_6">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <h2>Sunny Play</h2>

                <p>Our center is located in beautiful Miami, and it&rsquo;s currently {temperature}°F at our pet playground.
                </p>
              </div>
              <div className="intro-feature">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_15_29)">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M37.479 40.104C33.7639 43.213 29.0881 44.9419 24.244 44.9977C19.4 45.0536 14.6856 43.433 10.8997 40.4105C7.11388 37.3881 4.48942 33.1497 3.47109 28.4135C2.45275 23.6774 3.10317 18.7349 5.31214 14.4234C7.5211 10.112 11.1527 6.69687 15.5917 4.75677C20.0306 2.81666 25.0037 2.4709 29.6684 3.77808C34.3331 5.08526 38.4024 7.96498 41.1867 11.9293C43.971 15.8935 45.2991 20.6985 44.946 25.53C45.978 25.629 46.986 25.971 47.871 26.514C48.458 20.9469 47.0804 15.3497 43.9766 10.6909C40.8728 6.03218 36.2382 2.60494 30.8745 1.00222C25.5109 -0.600492 19.7557 -0.277844 14.6048 1.91434C9.45393 4.10652 5.23138 8.03032 2.66779 13.0068C0.104206 17.9833 -0.639128 23.6994 0.566406 29.166C1.77194 34.6326 4.8505 39.5059 9.2694 42.9426C13.6883 46.3792 19.1695 48.1631 24.7647 47.9855C30.3599 47.8079 35.7169 45.68 39.909 41.97C39.0627 41.3968 38.2512 40.7737 37.479 40.104ZM26.286 30.444C25.1654 30.7128 24.0574 31.0311 22.965 31.398C22.7757 31.4677 22.5743 31.4985 22.3729 31.4886C22.1714 31.4787 21.974 31.4282 21.7925 31.3403C21.611 31.2523 21.4491 31.1286 21.3164 30.9766C21.1838 30.8247 21.0832 30.6475 21.0206 30.4557C20.9581 30.264 20.9348 30.0616 20.9523 29.8606C20.9697 29.6597 21.0275 29.4643 21.1222 29.2862C21.2169 29.1081 21.3466 28.9509 21.5034 28.8241C21.6602 28.6973 21.841 28.6034 22.035 28.548C23.175 28.173 24.441 27.786 25.611 27.519C26.721 27.261 27.951 27.06 28.92 27.195C29.4 27.261 30.102 27.45 30.603 28.053C31.167 28.731 31.164 29.544 30.996 30.168C30.7942 30.8115 30.4792 31.414 30.066 31.947C29.835 32.268 29.562 32.607 29.241 32.976C29.562 33.348 29.838 33.696 30.069 34.017C30.495 34.608 30.837 35.208 30.999 35.802C31.164 36.426 31.167 37.239 30.603 37.92C30.099 38.52 29.391 38.706 28.914 38.772C27.945 38.901 26.715 38.691 25.608 38.433C24.4031 38.1378 23.2111 37.7925 22.035 37.398C21.841 37.3426 21.6602 37.2487 21.5034 37.1219C21.3466 36.9951 21.2169 36.8379 21.1222 36.6598C21.0275 36.4817 20.9697 36.2863 20.9523 36.0854C20.9348 35.8844 20.9581 35.682 21.0206 35.4903C21.0832 35.2985 21.1838 35.1213 21.3164 34.9694C21.4491 34.8174 21.611 34.6937 21.7925 34.6057C21.974 34.5178 22.1714 34.4673 22.3729 34.4574C22.5743 34.4475 22.7757 34.4783 22.965 34.548C24.078 34.908 25.248 35.268 26.292 35.511C26.82 35.634 27.267 35.718 27.63 35.763C27.1687 35.1452 26.6655 34.5598 26.124 34.011C25.8544 33.7305 25.7044 33.3563 25.7055 32.9673C25.7066 32.5783 25.8588 32.2049 26.13 31.926C26.6693 31.3843 27.1705 30.8059 27.63 30.195C27.1781 30.2541 26.7295 30.3392 26.286 30.444ZM28.584 30.183L28.575 30.18L28.566 30.177C28.578 30.177 28.584 30.183 28.584 30.183ZM28.59 35.784L28.572 35.787C28.5778 35.7845 28.5838 35.7825 28.59 35.781V35.784ZM18 24C19.656 24 21 21.984 21 19.5C21 17.016 19.656 15 18 15C16.344 15 15 17.016 15 19.5C15 21.984 16.344 24 18 24ZM26.271 22.311C26.4432 22.4067 26.6325 22.4676 26.8282 22.4902C27.0239 22.5128 27.2221 22.4966 27.4115 22.4425C27.601 22.3885 27.7779 22.2976 27.9322 22.1752C28.0866 22.0528 28.2153 21.9012 28.311 21.729C28.5479 21.2867 28.8992 20.9161 29.3282 20.6559C29.7572 20.3958 30.2483 20.2556 30.75 20.25C31.767 20.25 32.685 20.82 33.189 21.729C33.3823 22.0767 33.7059 22.3334 34.0885 22.4425C34.471 22.5516 34.8813 22.5043 35.229 22.311C35.5767 22.1177 35.8333 21.7941 35.9425 21.4115C36.0516 21.029 36.0043 20.6187 35.811 20.271C35.3142 19.3613 34.5827 18.6013 33.6927 18.07C32.8026 17.5387 31.7865 17.2556 30.75 17.25C28.56 17.25 26.682 18.486 25.689 20.271C25.5933 20.4432 25.5324 20.6325 25.5098 20.8282C25.4872 21.0239 25.5034 21.2221 25.5575 21.4115C25.6115 21.601 25.7023 21.7779 25.8248 21.9322C25.9472 22.0866 26.0988 22.2153 26.271 22.311ZM42 29.484C45.33 26.064 53.652 32.052 42 39.75C30.348 32.052 38.67 26.064 42 29.487V29.484Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_15_29">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <h2>Dedicated Staff</h2>

                <p>Our center has over 70 volunteers who play with the pets four times daily.</p>
              </div>
              <div className="intro-feature">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_15_31)">
                    <path
                      d="M7.5 1.5C7.5 1.10218 7.65804 0.720644 7.93934 0.43934C8.22065 0.158035 8.60218 0 9 0L39 0C39.3978 0 39.7794 0.158035 40.0607 0.43934C40.342 0.720644 40.5 1.10218 40.5 1.5C40.5 3.114 40.464 4.65 40.398 6.108C41.5834 6.30429 42.7175 6.73596 43.7334 7.37754C44.7493 8.01912 45.6265 8.85764 46.3131 9.84363C46.9998 10.8296 47.4821 11.9431 47.7316 13.1185C47.981 14.2938 47.9926 15.5072 47.7657 16.6872C47.5387 17.8671 47.0778 18.9896 46.4101 19.9885C45.7424 20.9874 44.8814 21.8426 43.8779 22.5034C42.8744 23.1643 41.7488 23.6176 40.5674 23.8365C39.3859 24.0554 38.1726 24.0355 36.999 23.778C34.629 29.373 31.365 32.109 28.5 32.811V39.33L32.775 40.398C33.357 40.542 33.906 40.803 34.386 41.163L39.9 45.3C40.1519 45.4889 40.3379 45.7522 40.4318 46.0527C40.5256 46.3533 40.5226 46.6757 40.423 46.9743C40.3235 47.273 40.1325 47.5328 39.8771 47.7169C39.6217 47.9009 39.3148 48 39 48H9C8.68518 48 8.37834 47.9009 8.12294 47.7169C7.86754 47.5328 7.67653 47.273 7.57698 46.9743C7.47742 46.6757 7.47436 46.3533 7.56823 46.0527C7.6621 45.7522 7.84814 45.4889 8.1 45.3L13.614 41.163C14.094 40.803 14.643 40.542 15.225 40.398L19.5 39.33V32.811C16.635 32.109 13.371 29.373 11.001 23.775C9.82676 24.0339 8.61255 24.0548 7.43008 23.8366C6.2476 23.6184 5.12084 23.1655 4.11634 22.5045C3.11184 21.8436 2.24997 20.9881 1.58162 19.9885C0.913275 18.9889 0.452009 17.8655 0.225066 16.6847C-0.00187797 15.5039 0.0101017 14.2895 0.260297 13.1134C0.510493 11.9373 0.993831 10.8232 1.68177 9.83701C2.3697 8.85081 3.24829 8.01245 4.26563 7.37146C5.28298 6.73047 6.41845 6.29984 7.605 6.105C7.53438 4.57102 7.49937 3.03561 7.5 1.5ZM7.797 9.12C6.23156 9.40643 4.84402 10.303 3.93963 11.6125C3.03523 12.922 2.68807 14.5371 2.9745 16.1025C3.26094 17.6679 4.15751 19.0555 5.46698 19.9599C6.77645 20.8643 8.39156 21.2114 9.957 20.925C8.958 17.775 8.193 13.887 7.797 9.12ZM38.046 20.925C39.6114 21.2114 41.2266 20.8643 42.536 19.9599C43.8455 19.0555 44.7421 17.6679 45.0285 16.1025C45.3149 14.5371 44.9678 12.922 44.0634 11.6125C43.159 10.303 41.7714 9.40643 40.206 9.12C39.807 13.89 39.042 17.775 38.046 20.925ZM10.512 3C10.533 4.551 10.59 6.018 10.68 7.407C11.07 13.491 12.051 18.045 13.29 21.408C15.882 28.44 19.452 30 21 30C21.3978 30 21.7794 30.158 22.0607 30.4393C22.342 30.7206 22.5 31.1022 22.5 31.5V39.33C22.5 39.9988 22.2765 40.6484 21.865 41.1756C21.4536 41.7029 20.8777 42.0775 20.229 42.24L15.951 43.308C15.7568 43.3563 15.5742 43.443 15.414 43.563L13.5 45H34.5L32.586 43.563C32.4249 43.4427 32.2412 43.356 32.046 43.308L27.771 42.24C27.1223 42.0775 26.5464 41.7029 26.135 41.1756C25.7235 40.6484 25.5 39.9988 25.5 39.33V31.5C25.5 31.1022 25.658 30.7206 25.9393 30.4393C26.2206 30.158 26.6022 30 27 30C28.548 30 32.118 28.44 34.71 21.408C35.949 18.048 36.93 13.488 37.32 7.407C37.41 6.018 37.467 4.551 37.488 3H10.512Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_15_31">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <h2>Voted #1</h2>

                <p>For the last five years we&rsquo;ve consistently been voted the #1 pet adoption center in the state.</p>
              </div>
              <div className="intro-feature">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_15_33)">
                    <path
                      d="M18 0.83401C18.2928 1.18985 18.4722 1.62533 18.515 2.08418C18.5578 2.54303 18.462 3.00417 18.24 3.40801C16.5056 6.59243 15.5998 10.1619 15.606 13.788C15.606 25.851 25.44 35.619 37.56 35.619C39.141 35.619 40.68 35.454 42.159 35.139C42.6124 35.0408 43.0846 35.0784 43.5168 35.247C43.949 35.4156 44.3219 35.7077 44.589 36.087C44.871 36.4814 45.0147 36.9578 44.9979 37.4423C44.9811 37.9268 44.8046 38.3922 44.496 38.766C42.1431 41.6563 39.1747 43.9851 35.8075 45.5826C32.4403 47.18 28.759 48.0059 25.032 48C11.202 48 0 36.858 0 23.13C0 12.798 6.342 3.93601 15.372 0.18001C15.8218 -0.0100939 16.3212 -0.049112 16.795 0.0688175C17.2689 0.186747 17.6918 0.455256 18 0.83401ZM14.574 3.93301C11.1018 5.7955 8.19911 8.56394 6.17439 11.9441C4.14968 15.3243 3.0786 19.1898 3.075 23.13C3.075 35.19 12.912 44.958 25.032 44.958C27.9343 44.963 30.8088 44.3924 33.4892 43.2791C36.1695 42.1657 38.6024 40.5319 40.647 38.472C39.636 38.598 38.607 38.661 37.56 38.661C23.73 38.661 12.531 27.519 12.531 13.791C12.531 10.29 13.257 6.95701 14.574 3.93301Z"
                      fill="white" />
                    <path
                      d="M32.382 9.44399C32.425 9.31408 32.5079 9.20102 32.6188 9.12089C32.7298 9.04076 32.8632 8.99763 33 8.99763C33.1369 8.99763 33.2702 9.04076 33.3812 9.12089C33.4921 9.20102 33.575 9.31408 33.618 9.44399L34.779 12.93C35.298 14.484 36.516 15.702 38.07 16.221L41.556 17.382C41.6859 17.425 41.799 17.5079 41.8791 17.6188C41.9592 17.7298 42.0024 17.8631 42.0024 18C42.0024 18.1368 41.9592 18.2702 41.8791 18.3812C41.799 18.4921 41.6859 18.575 41.556 18.618L38.07 19.779C37.3036 20.0343 36.6072 20.4647 36.0359 21.0359C35.4647 21.6071 35.0344 22.3036 34.779 23.07L33.618 26.556C33.575 26.6859 33.4921 26.799 33.3812 26.8791C33.2702 26.9592 33.1369 27.0024 33 27.0024C32.8632 27.0024 32.7298 26.9592 32.6188 26.8791C32.5079 26.799 32.425 26.6859 32.382 26.556L31.221 23.07C30.9657 22.3036 30.5353 21.6071 29.9641 21.0359C29.3929 20.4647 28.6964 20.0343 27.93 19.779L24.444 18.618C24.3141 18.575 24.201 18.4921 24.1209 18.3812C24.0408 18.2702 23.9977 18.1368 23.9977 18C23.9977 17.8631 24.0408 17.7298 24.1209 17.6188C24.201 17.5079 24.3141 17.425 24.444 17.382L27.93 16.221C28.6964 15.9656 29.3929 15.5353 29.9641 14.9641C30.5353 14.3928 30.9657 13.6964 31.221 12.93L32.382 9.44399ZM41.589 0.296994C41.6186 0.211573 41.6741 0.137502 41.7478 0.0850788C41.8214 0.0326558 41.9096 0.00448608 42 0.00448608C42.0904 0.00448608 42.1786 0.0326558 42.2522 0.0850788C42.3259 0.137502 42.3814 0.211573 42.411 0.296994L43.185 2.61899C43.53 3.65699 44.343 4.46999 45.381 4.81499L47.703 5.58899C47.7884 5.61861 47.8625 5.6741 47.9149 5.74776C47.9674 5.82142 47.9955 5.90958 47.9955 5.99999C47.9955 6.0904 47.9674 6.17857 47.9149 6.25222C47.8625 6.32588 47.7884 6.38138 47.703 6.41099L45.381 7.18499C44.8695 7.35516 44.4047 7.64224 44.0235 8.02344C43.6423 8.40464 43.3552 8.86946 43.185 9.38099L42.411 11.703C42.3814 11.7884 42.3259 11.8625 42.2522 11.9149C42.1786 11.9673 42.0904 11.9955 42 11.9955C41.9096 11.9955 41.8214 11.9673 41.7478 11.9149C41.6741 11.8625 41.6186 11.7884 41.589 11.703L40.815 9.38099C40.6448 8.86946 40.3578 8.40464 39.9766 8.02344C39.5954 7.64224 39.1305 7.35516 38.619 7.18499L36.297 6.41099C36.2116 6.38138 36.1375 6.32588 36.0851 6.25222C36.0327 6.17857 36.0045 6.0904 36.0045 5.99999C36.0045 5.90958 36.0327 5.82142 36.0851 5.74776C36.1375 5.6741 36.2116 5.61861 36.297 5.58899L38.619 4.81499C39.657 4.46999 40.47 3.65699 40.815 2.61899L41.589 0.299994V0.296994Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_15_33">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <h2>Nightly Yoga</h2>

                <p>Every night our staff leads a yoga session and the animals are free to roam around and relax around
                  people.
                </p>
              </div>
            </div>

          </div>

          <div className="circle"></div>
          <div className="circle-two"></div>

        </div>
      </div>
      <PetsListSection pets={pets} />
    </>
  )
}

export default HomePage