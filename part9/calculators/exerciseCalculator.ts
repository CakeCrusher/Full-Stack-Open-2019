interface Summary {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
const parseECInputs = (args: Array<string>): Array<number>  => {
    const dynamicArgs = args.slice(2,args.length);
    if (dynamicArgs.find(a => isNaN(Number(a)))) {
        throw new Error('all args must be nums');
    } else {
        return dynamicArgs.map(a => Number(a));
    }
};
const exerciseCalculator = (data: Array<number>, target: number): Summary => {
    const average = data.reduce((i, t) => i + t, 0) / data.length;
    let ratingNum;
    let ratingD;
    if (average < target) {
        ratingNum = 1;
        ratingD = 'bad';
    } else if (average === target) {
        ratingNum = 2;
        ratingD = 'ok';
    } else if (average > target) {
        ratingNum = 3;
        ratingD = 'good';
    } else {
        throw new Error('rating data did not get assigned');
    }

    return {
        periodLength: data.length,
        trainingDays: data.filter(ts => ts > 0).length,
        success: Boolean(average >= target),
        rating: ratingNum,
        ratingDescription: ratingD,
        target,
        average
    };
};

try {
    const args = parseECInputs(process.argv);
    console.log(exerciseCalculator(args.slice(1,args.length), args[0]));
} catch ({message}) {
    console.log('Error: ', message);
}

export default exerciseCalculator;