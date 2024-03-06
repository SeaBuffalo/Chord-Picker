import { IntervalValue } from '../enums/IntervalValue';
import { IntervalArgs } from '../interfaces/IntervalArgs';
import { IntervalRes } from '../interfaces/IntervalRes';
import { getEnumKeyFromValue } from '../utils/commonUtils';
import { Note } from './Note';

export class Interval {
  public notes: [Note, Note];
  public root: Note;
  public intervalString: string;
  public intervalValue: number;

  constructor({ notes, root }: IntervalArgs) {
    this.notes = notes;
    this.root = root;

    const { intervalString, intervalValue } = this.determineInterval(
      this.notes[0].noteValue,
      this.notes[1].noteValue
    );
    this.intervalString = intervalString;
    this.intervalValue = intervalValue;
  }

  public determineInterval(n1: number, n2: number): IntervalRes {
    const res: IntervalRes = {
      intervalString: '',
      intervalValue: 0,
    };

    res.intervalValue = Math.abs(n1 - n2);
    if (n1 > n2) {
      res.intervalValue = 12 - Math.abs(n1 - n2);
    } else {
      res.intervalValue = n2 - n1;
    }

    res.intervalString = getEnumKeyFromValue(IntervalValue, res.intervalValue);
    return res;
  }
}
