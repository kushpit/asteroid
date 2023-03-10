function showResult() {
    const result = findAsteroid();
    const resultObj = JSON.parse(result);
    const location = resultObj.result.location;
    const count = resultObj.result.probes.count;
    const coordinates = resultObj.result.probes.coordinates;
    const output = `Location of asteroid: (${location.x}, ${location.y}, ${location.z})<br>
        Number of probes used: ${count}<br>
        Coordinates of probes: ${JSON.stringify(coordinates)}`;
    document.getElementById("result").innerHTML = output;
}
function findAsteroid() {
    // Генеруємо випадкові координати для точки-астероїда
    const asteroidX = Math.floor(Math.random() * 101);
    const asteroidY = Math.floor(Math.random() * 101);
    const asteroidZ = Math.floor(Math.random() * 101);
    const asteroidLocation = { x: asteroidX, y: asteroidY, z: asteroidZ };

    // Створюємо пустий масив для зберігання координат зондів
    const probeCoordinates = [];

    // Обходимо всі можливі координати зондів (від 0 до 100 по кожній з трьох вимірів)
    for (let x = 0; x <= 100; x++) {
        for (let y = 0; y <= 100; y++) {
            for (let z = 0; z <= 100; z++) {
                // Створюємо об'єкт з координатами зонда
                const probeLocation = { x: x, y: y, z: z };
                // Обчислюємо відстань від зонда до точки-астероїда
                const distance = Math.sqrt(Math.pow(x - asteroidX, 2) + Math.pow(y - asteroidY, 2) + Math.pow(z - asteroidZ, 2));
                // Якщо відстань менше або дорівнює 50, зберігаємо координати зонда
                if (distance <= 50) {
                    probeCoordinates.push(probeLocation);
                }
            }
        }
    }

    // Повертаємо результат у форматі JSON
    return JSON.stringify({
        result: {
            location: asteroidLocation,
            probes: {
                count: probeCoordinates.length,
                coordinates: probeCoordinates
            }
        }
    });
}