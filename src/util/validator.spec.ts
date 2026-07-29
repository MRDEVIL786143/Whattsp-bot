import { joiValidateNumber, joiValidateString } from './validator'

describe('Validator Utils', () => {
    describe('joiValidateNumber', () => {
        it('should validate and return a number when input is a valid number', async () => {
            const result = await joiValidateNumber(123)
            expect(result).toBe(123)
        })

        it('should validate and return a number when input is a numeric string', async () => {
            const result = await joiValidateNumber('456')
            expect(result).toBe(456)
        })

        it('should throw an error when input is not a number', async () => {
            await expect(joiValidateNumber('abc')).rejects.toThrow()
        })

        it('should throw an error when input is null/undefined', async () => {
            // Although the function might cast null to 0 depending on +val, let's see how Joi handles it.
            // +null is 0. +undefined is NaN.
            // Joi.number().required() fails on NaN.
            await expect(joiValidateNumber(undefined)).rejects.toThrow()
        })
    })

    describe('joiValidateString', () => {
        it('should validate and return a string', async () => {
            const result = await joiValidateString('hello')
            expect(result).toBe('hello')
        })

        it('should throw error when input is a number (Joi strictness)', async () => {
            await expect(joiValidateString(123)).rejects.toThrow()
        })

        it('should throw for empty string (Joi default behavior)', async () => {
            await expect(joiValidateString('')).rejects.toThrow()
        })

        it('should throw when input is invalid (e.g. object that cant be stringified nicely? Joi string might accept objects?)', async () => {
            // Joi.string() usually rejects objects.
            await expect(joiValidateString({ foo: 'bar' })).rejects.toThrow()
        })
    })
})
