// when screen finishes loading, it adds the class of hiding
window.addEventListener("load", () => {
    document.querySelector(".preloader").classList.add("hidePreloader");
});

// modules

// create cars
const CreateCars = (() => {
    // car data
    const cars = [];

    // car class
    class Car {
        constructor(
            make,
            country,
            img,
            special,
            model,
            price,
            type,
            trans,
            gas
        ) {
            this.make = make;
            this.country = country;
            this.img = img;
            this.special = special;
            this.model = model;
            this.price = price;
            this.type = type;
            this.trans = trans;
            this.gas = gas;
        }
    }

    // car creation function
    function makeCar(
        make,
        country,
        img = "/img/car-default.jpeg",
        special = true,
        model = "new model",
        price = 10000,
        type = "sedan",
        trans = "automatic",
        gas = "50"
    ) {
        const car = new Car(
            make,
            country,
            img,
            special,
            model,
            price,
            type,
            trans,
            gas
        );
        // adds the new car in cars
        cars.push(car);
    }

    // produce cars function
    function produceCars() {
        makeCar("chevy", "american");
        makeCar("mercedes", "german", "/img/car-german-1.jpeg", true);
        makeCar("mercedes", "german", "/img/car-german-2.jpeg", true);
        makeCar(
            "mercedes",
            "german",
            "/img/car-german-3.jpeg",
            false,
            "some model"
        );
        makeCar(
            "mercedes",
            "german",
            "/img/car-german-4.jpeg",
            undefined,
            "other model"
        );
        makeCar("mercedes", "german", "/img/car-german-5.jpeg", false);
        makeCar("chevy", "american", "/img/car-american-1.jpeg", true);
        makeCar("chevy", "american", "/img/car-american-2.jpeg", false);
        makeCar("chevy", "american", "/img/car-american-3.jpeg", false);
        makeCar("chevy", "american", "/img/car-american-4.jpeg", false);
        makeCar("chevy", "american", "/img/car-american-5.jpeg", false);
    }
    produceCars();
    // console.log(cars);

    // filter special cars
    const specialCars = cars.filter((car) => car.special === true);
    // console.log(specialCars);

    return {
        cars,
        specialCars,
    };
})();

// display special cars
const DisplaySpecialCars = ((CreateCars) => {
    // variable for special cars using the previous module
    const specialCars = CreateCars.specialCars;

    // select the parent class of special cars
    const info = document.querySelector(".featured-info");

    // document loaded event
    document.addEventListener("DOMContentLoaded", () => {
        // every time the dom loads, clear the data inside info
        info.innerHTML = "";

        let data = "";

        // for each data inside special cars, adds this html inside info
        specialCars.forEach((item) => {
            data += `<!-- single item -->
            <div
                class="featured-item my-3 d-flex p-2 text-capitalize align-items-lg-baseline flex-wrap"
            >
                <span data-img='${item.img}' class="featured-icon mr-2"
                    ><i class="fas fa-car"></i
                ></span>
                <h5 class="font-weight-bold mx-1">
                    ${item.make}
                </h5>
                <h5 class="mx-1">${item.model}</h5>
            </div>
            <!-- end of single item -->`;
        });

        info.innerHTML = data;
    });

    // change img
    info.addEventListener("click", (event) => {
        if (event.target.parentElement.classList.contains("featured-icon")) {
            const img = event.target.parentElement.dataset.img;

            // adds the value of img in the source of .featured-photo
            document.querySelector(".featured-photo").src = img;
        }
    });
})(CreateCars);

// display all cars
const DisplayCars = ((CreateCars) => {
    // all cars
    const cars = CreateCars.cars;
    // car container
    const inventory = document.querySelector(".inventory-container");

    // content loaded
    document.addEventListener("DOMContentLoaded", () => {
        // clear inventory when page loads
        inventory.innerHTML = "";

        // variable for inventory
        let output = "";

        // forEach to add dynamic data
        cars.forEach((car) => {
            output += `<!-- single car -->
            <div class="col-10 mx-auto my-3 col-md-6 col-lg-4 single-car ${car.country}">
                <div class="card car-card">
                    <img
                        src="${car.img}"
                        alt="german1"
                        class="card-img-top car-img"
                    />
                    <!-- card body -->
                    <div class="card-body">
                        <div
                            class="card-info d-flex justify-content-between"
                        >
                            <div class="card-text text-uppercase">
                                <h6 class="font-weight-bold">
                                    ${car.make}
                                </h6>
                                <h6>${car.model}</h6>
                            </div>
                            <h5
                                class="car-value align-self-center py-2 px-3"
                            >
                                $<span class="car-price">${car.price}</span>
                            </h5>
                        </div>
                    </div>
                    <!-- end of card body -->
                    <div
                        class="card-footer text-capitalize d-flex justify-content-between"
                    >
                        <p>
                            <span><i class="fas fa-car"></i></span>${car.type}
                        </p>
                        <p>
                            <span><i class="fas fa-cogs"></i></span
                            >${car.trans}
                        </p>
                        <p>
                            <span><i class="fas fa-gas-pump"></i></span
                            >${car.gas}
                        </p>
                    </div>
                </div>
            </div>
            <!-- end of single car -->`;
        });
        // show the dynaminc inventory
        inventory.innerHTML = output;
    });
})(CreateCars);

// filter cars
const FilterCars = (() => {
    // selects the class of filter btns
    const filter = document.querySelectorAll(".filter-btn");

    // for each button, adds a event listener of click
    filter.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            // when click, saves in value the dataset of data-filter
            const value = event.target.dataset.filter;

            // selects all elements with .single-car class
            const singleCar = document.querySelectorAll(".single-car");

            singleCar.forEach((car) => {
                if (value === "all") {
                    car.style.display = "block";
                } else {
                    // if car has a class list of american, shows american cars, else none
                    car.classList.contains(value)
                        ? (car.style.display = "block")
                        : (car.style.display = "none");
                }
            });
        });
    });
})();
