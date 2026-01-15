import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgOptimizedImage],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App implements OnInit {
    private host: ElementRef<HTMLElement> = inject(ElementRef);

    public ngOnInit(): void {
        const cards =
            this.host.nativeElement.querySelectorAll<HTMLElement>('.holo-card');

        cards.forEach((card: HTMLElement) => {
            card.addEventListener('pointermove', (event: PointerEvent): void => {
                const r: DOMRect = card.getBoundingClientRect();

                let x: number = ((event.clientX - r.left) / r.width) * 100;
                let y: number = ((event.clientY - r.top) / r.height) * 100;

                // Clamp pointer inside card bounds (important for mobile)
                x = Math.min(Math.max(x, 0), 100);
                y = Math.min(Math.max(y, 0), 100);

                card.style.setProperty('--mx', `${x}%`);
                card.style.setProperty('--my', `${y}%`);

                // Limit rotation (smaller for touch feels better)
                const maxRotation: number =
                    event.pointerType === 'touch' ? 6 : 10;

                const rotateX: number = Math.min(
                    Math.max(-(y - 50) / 6, -maxRotation),
                    maxRotation
                );

                const rotateY: number = Math.min(
                    Math.max((x - 50) / 6, -maxRotation),
                    maxRotation
                );

                card.style.setProperty('--rx', `${rotateX}deg`);
                card.style.setProperty('--ry', `${rotateY}deg`);
                card.style.setProperty('--lift', '1');
            });

            card.addEventListener('pointerleave', (): void => {
                card.style.setProperty('--rx', '0deg');
                card.style.setProperty('--ry', '0deg');
                card.style.setProperty('--mx', '50%');
                card.style.setProperty('--my', '50%');
                card.style.setProperty('--lift', '0');
            });
        });
    }

}
