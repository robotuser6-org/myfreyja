import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomDropdownComponent } from './custom-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CustomDropdownComponent', () => {
  let component: CustomDropdownComponent;
  let fixture: ComponentFixture<CustomDropdownComponent>;
  let debugElement: DebugElement;
  let dropdownElement;
  let select;

  const options = [
    {
      label: 'Option 1',
      value: 'option1'
    },
    {
      label: 'Option 2',
      value: 'option2'
    },
    {
      label: 'Option 2',
      value: 'option2'
    },
    {
      label: 'Option 3',
      value: 'option3'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDropdownComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDropdownComponent);
    component = fixture.componentInstance;
    component.options = options;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    dropdownElement = debugElement.query(By.css('.fj-custom-dropdown select'));
    select = dropdownElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event when clicked', () => {
    spyOn(component.click, 'emit');
    select.click();
    expect(component.click.emit).toHaveBeenCalled();
  });

  it('should emit emit optionSelected event when an option is selected and set correct value', () => {
    spyOn(component.optionSelected, 'emit');
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(select.value).toBe(options[1].value);
    expect(component.optionSelected.emit).toHaveBeenCalledWith(options[1].value);
  });

  it('should emit focus event on focus', () => {
    spyOn(component.focus, 'emit');
    select.dispatchEvent(new Event('focus'));
    expect(component.focus.emit).toHaveBeenCalled();
  });

  it('should generate class list based on props', () => {
    component.size = 'large';
    component.required = true;
    component.error = 'example error';
    component.fullWidth = true;

    const classes = component.generateClassList();

    expect(classes).toEqual({
      'fj-custom-dropdown--large': 'large',
      'fj-custom-dropdown--required': true,
      'fj-custom-dropdown--error': 'example error',
      'fj-custom-dropdown--full-width': true
    });
  });
});
