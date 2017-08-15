import { Syntax } from './syntax'

let syntax = new Syntax();
describe('syntax', () => {
    it('[isEmailAddress] should return true which correct value', () => {
        expect(syntax.isEmailAddress('luklasz@os.pl')).toBeTruthy();
        expect(syntax.isEmailAddress('karol@os.com')).toBeTruthy();
        expect(syntax.isEmailAddress('luklasz@os.ge')).toBeTruthy();
        expect(syntax.isEmailAddress('wer3-5@gmail.pl')).toBeTruthy();
    })

    it('[isEmailAddress] should return false which incorrect value', () => {
        expect(syntax.isEmailAddress('luklas')).toBeFalsy();
        expect(syntax.isEmailAddress('karol@osgcom')).toBeFalsy();
        expect(syntax.isEmailAddress('luklasz@@gmail.com')).toBeFalsy();
    })
});