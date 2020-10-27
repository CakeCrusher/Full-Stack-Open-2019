import express from 'express';
import exerciseCalculator from './exerciseCalculator';
import calculateBmi from './bmiCalculator';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi',(req, res) => {
    try {
        const bmiResult = calculateBmi(Number(req.query.weight), Number(req.query.height));
        res.send({
            weight: req.query.weight,
            height: req.query.height,
            bmi: bmiResult
        });
    } catch ({message}) {
        res.send({
            error: message
        });
    }
});
interface BodyObject {
    daily_exercises: Array<number>;
    target: Number;
}
app.post('/exercises', ({body}: {body: BodyObject}, res) => {
    if (!body.daily_exercises || !body.target) {
        res.send({
            error: "perameters missing"
        });
    } else {
        const result = exerciseCalculator(body.daily_exercises, Number(body.target));
        res.json(result);
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});