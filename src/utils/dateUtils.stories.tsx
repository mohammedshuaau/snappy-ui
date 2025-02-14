import {useState} from 'react';
import type {Meta} from '@storybook/react';
import {
    dateComparison,
    dateManipulation,
    dateRanges,
    formatDate,
    getRelativeTimeString,
    isValidDate,
    parseDate,
} from './dateUtils';

const meta = {
    title: 'Utils/DateUtils',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const DateUtilsDemo = () => {
    const [date, setDate] = useState(new Date());
    const [formatString, setFormatString] = useState('yyyy-MM-dd');

    const examples = [
        {
            title: 'Format Date',
            code: `formatDate(date, '${formatString}')`,
            result: formatDate(date, formatString),
        },
        {
            title: 'Parse Date',
            code: `parseDate('2024-01-01')`,
            result: parseDate('2024-01-01').toISOString(),
        },
        {
            title: 'Validate Date',
            code: `isValidDate('2024-01-01')`,
            result: isValidDate('2024-01-01').toString(),
        },
        {
            title: 'Relative Time',
            code: `getRelativeTimeString(date)`,
            result: getRelativeTimeString(date),
        },
        {
            title: 'Add Days',
            code: `dateManipulation.addDays(date, 5)`,
            result: dateManipulation.addDays(date, 5).toISOString(),
        },
        {
            title: 'Start of Month',
            code: `dateRanges.startOfMonth(date)`,
            result: dateRanges.startOfMonth(date).toISOString(),
        },
        {
            title: 'Is Weekend',
            code: `dateComparison.isWeekend(date)`,
            result: dateComparison.isWeekend(date).toString(),
        },
    ];

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Date Utils Demo</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Test Date:
                            <input
                                type="datetime-local"
                                value={date.toISOString().slice(0, 16)}
                                onChange={(e) => setDate(new Date(e.target.value))}
                                className="ml-2 p-2 border rounded"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Format String:
                            <input
                                type="text"
                                value={formatString}
                                onChange={(e) => setFormatString(e.target.value)}
                                className="ml-2 p-2 border rounded"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {examples.map((example) => (
                    <div
                        key={example.title}
                        className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                        <h3 className="font-semibold mb-2">{example.title}</h3>
                        <div className="bg-gray-50 p-2 rounded mb-2 font-mono text-sm">
                            {example.code}
                        </div>
                        <div className="text-sm">
                            Result: <span className="font-semibold">{example.result}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 