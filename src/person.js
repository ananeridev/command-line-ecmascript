export default class Person {
    constructor({ id, vehicles, kmTraveled, from, to}) {
        this.id = id
        this.vehicles = vehicles
        this.kmTraveled = kmTraveled
        this.from = from
        this.to = to
    }

    formatted(language) {
        const mapDate = (date) => {
            const [ year, month, day ] = date.split('-').map(Number)

            // datas no JS começam do zero!
            return new Date(year, (month -1), day)
        }
        return {
            id: Number(this.id),
            vehicles: new Intl
                .ListFormat(language, { style: "long", type: "conjunction"})
                .format(this.vehicles),
            kmTraveled: new Intl
                .NumberFormat(language, { style: "unit", unit: "kilometer"})
                .format(this.kmTraveled),
            from: new Intl
                .DateTimeFormat(language, { month: "long", day: "2-digit", year: "numeric"})
                .format(mapDate(this.from)),
            to: new Intl
                .DateTimeFormat(language, { month: "long", day: "2-digit", year: "numeric"})
                .format(mapDate(this.to)),
                
        }
    }

    static generateInstanceFromString(text) {
        const EMPTY_SPACE = ' '
        const [id, kmTraveled, from, to, vehicles] = text.split(EMPTY_SPACE)
        const person = new Person({
            id,
            kmTraveled,
            from,
            to,
            vehicles: vehicles.split(','),
        })

        return person
    }
}

// 2 Bike 20000000 2000-01-01 2002-02-01