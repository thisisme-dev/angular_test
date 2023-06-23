import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
})
export class MemoryComponent implements OnInit {
  @ViewChild('uiMemoryGame', { static: false }) uiMemoryGame: ElementRef =
    {} as ElementRef;
  @ViewChild('memoryModal', { static: false }) memoryModal: ElementRef =
    {} as ElementRef;
  cards: {
    name: string;
    img: string;
    id: number;
    matched?: boolean;
    picked?: boolean;
  }[] = [
    {
      name: 'fish',
      img: './assets/memory/6691597_discus_fish_animal_animals_pet_icon.png',
      id: 1,
    },
    {
      name: 'fish2',
      img: './assets/memory/6691606_animal_fish_flowerhorn_animals_cute_icon.png',
      id: 2,
    },
    {
      name: 'birds',
      img: './assets/memory/7343088_bird_love_romance_heart_animals_icon.png',
      id: 3,
    },
    {
      name: 'bear',
      img: './assets/memory/7616818_bear_animal_pet_creature_animals_icon.png',
      id: 4,
    },
    {
      name: 'clownfisch',
      img: './assets/memory/7616819_clownfish_animal_pet_creature_animals_icon.png',
      id: 5,
    },
    {
      name: 'dog',
      img: './assets/memory/7616820_dog_animal_pet_creature_animals_icon.png',
      id: 6,
    },
    {
      name: 'penguin',
      img: './assets/memory/7616822_penguin_animal_pet_creature_animals_icon.png',
      id: 7,
    },
    {
      name: 'monkey',
      img: './assets/memory/7616823_monkey_animal_pet_creature_animals_icon.png',
      id: 8,
    },
    {
      name: 'seahorse',
      img: './assets/memory/7616824_seahorses_animal_pet_creature_animals_icon.png',
      id: 9,
    },
    {
      name: 'snail',
      img: './assets/memory/7616825_snail_animal_pet_creature_animals_icon.png',
      id: 10,
    },
    {
      name: 'starfish',
      img: './assets/memory/7616826_starfish_animal_pet_creature_animals_icon.png',
      id: 11,
    },
    {
      name: 'turtle',
      img: './assets/memory/7616828_turtle_animal_pet_creature_animals_icon.png',
      id: 12,
    },
    {
      name: 'fish',
      img: './assets/memory/6691597_discus_fish_animal_animals_pet_icon.png',
      id: 1,
    },
    {
      name: 'fish2',
      img: './assets/memory/6691606_animal_fish_flowerhorn_animals_cute_icon.png',
      id: 2,
    },
    {
      name: 'birds',
      img: './assets/memory/7343088_bird_love_romance_heart_animals_icon.png',
      id: 3,
    },
    {
      name: 'bear',
      img: './assets/memory/7616818_bear_animal_pet_creature_animals_icon.png',
      id: 4,
    },
    {
      name: 'clownfisch',
      img: './assets/memory/7616819_clownfish_animal_pet_creature_animals_icon.png',
      id: 5,
    },
    {
      name: 'dog',
      img: './assets/memory/7616820_dog_animal_pet_creature_animals_icon.png',
      id: 6,
    },
    {
      name: 'penguin',
      img: './assets/memory/7616822_penguin_animal_pet_creature_animals_icon.png',
      id: 7,
    },
    {
      name: 'monkey',
      img: './assets/memory/7616823_monkey_animal_pet_creature_animals_icon.png',
      id: 8,
    },
    {
      name: 'seahorse',
      img: './assets/memory/7616824_seahorses_animal_pet_creature_animals_icon.png',
      id: 9,
    },
    {
      name: 'snail',
      img: './assets/memory/7616825_snail_animal_pet_creature_animals_icon.png',
      id: 10,
    },
    {
      name: 'starfish',
      img: './assets/memory/7616826_starfish_animal_pet_creature_animals_icon.png',
      id: 11,
    },
    {
      name: 'turtle',
      img: './assets/memory/7616828_turtle_animal_pet_creature_animals_icon.png',
      id: 12,
    },
  ];

  paused: boolean = false;
  matches: number = 0;
  turn: number = 0;
  guess = null;

  constructor() {}

  ngOnInit(): void {
    this.shuffle(this.cards);
  }

  trackByFunc(i: number, item: any) {
    return item.id;
  }

  cardClicked(card: any, index: number) {
    if (
      !this.paused &&
      !this.cards[index].matched &&
      !this.cards[index].picked
    ) {
      this.turn++;
      if (!this.guess || this.guess == null) {
        this.guess = card.id;
      } else if (card.id == this.guess) {
        this.cards[index].matched = true;
        this.cards.forEach((element) => {
          if (element.picked) {
            element.matched = true;
          }
        });
        this.matches++;
        this.guess = null;
      } else {
        this.guess = null;
        this.paused = true;
        setTimeout(() => {
          this.cards.forEach((element) => {
            if (element.picked) {
              element.picked = false;
              this.paused = false;
            }
          });
        }, 600);
      }
      if (this.matches >= 12) {
        this.win();
      }
    }
  }

  win() {
    this.paused = true;
    setTimeout(() => {
      this.showModal();
    }, 1000);
  }

  showModal() {
    this.memoryModal.nativeElement.style = 'display:block';
  }

  hideModal() {
    this.memoryModal.nativeElement.style = 'display:none';
  }

  reset() {
    this.hideModal();
    this.cards.forEach((element) => {
      element.picked = false;
      element.matched = false;
    });
    this.turn = 0;
    this.matches = 0;
    this.paused = false;
  }

  // // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
  shuffle(array: { name: string; img: string; id: number }[]) {
    var counter = array.length,
      temp,
      index;
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }
}
