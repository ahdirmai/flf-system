<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromArray;

class ParticipantsTemplateExport implements FromArray, WithHeadings
{
    public function headings(): array
    {
        return [
            'name',
            'phone',
        ];
    }

    public function array(): array
    {
        return [
            ['John Doe', '08123456789'], // Example row
        ];
    }
}
