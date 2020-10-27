// kg/m**2=bmi
// normal <25    overweight 24-29    obese >29
type BodyType = 'normal'|'overweight'|'obese';
interface bmiInputs {
    kg: number;
    m: number;
}
const parseInputs = (args: Array<string>): bmiInputs  => {
    if (args.length < 4) throw new Error('needs more args');
    if (args.length > 4) throw new Error('too many args');
    console.log(args);
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {kg: Number(args[2]), m: Number(args[3])};
    } else {
        throw new Error('all args must be nums');
    }
};
const calculateBmi = (kg: number, m: number): BodyType => {
    const bmi = kg / ((m/100) ** 2);
    if (bmi < 25) return 'normal';
    else if (25 <= bmi && bmi <= 29) return 'overweight';
    else if (bmi > 30) return 'obese';
    else throw new Error('no fitting description');
};
try {
    const {kg, m} = parseInputs(process.argv);
    console.log(calculateBmi(kg, m));
} catch ({message}) {
    console.log('Error: ', message);
}

export default calculateBmi;
