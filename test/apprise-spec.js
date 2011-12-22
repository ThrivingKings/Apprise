
// Turn off all jQuery animations.
jQuery.fx.off = true;

describe('Apprise', function() {
  var message = function() {
    return $('.appriseInner').contents().eq(0);
  };

  var okButton = _.bind($, this, '.aButtons button[value=ok]'),
      cancelButton = _.bind($, this, '.aButtons button[value=cancel]'),
      callback;

  beforeEach(function() {
    callback = jasmine.createSpy('button click callback');
  });

  afterEach(function() {
    okButton().click();
  });


  describe('Alert', function() {
    it('should display a message with an OK button.', function() {
      apprise('Hello');
      expect(message().text()).toBe('Hello');
      expect(okButton().text()).toBe('OK');
      expect(cancelButton().length).toBe(0);
    });

    it('should display a message with a custom text for the OK button.', function() {
      apprise('Hi', {'textOk': 'Yep'});
      expect(message().text()).toBe('Hi');
      expect(okButton().text()).toBe('Yep');
    });

    it('should return True when the OK button is clicked.', function() {
      apprise('Hello', {}, callback);
      okButton().click();
      expect(callback).toHaveBeenCalledWith(true);
    });
  });


  describe('Confirm', function() {
    it('should display a message and request confirmation', function() {
      apprise('Do you confirm?', {'confirm': true});
      expect(message().text()).toBe('Do you confirm?');
      expect(okButton().text()).toBe('OK');
      expect(cancelButton().text()).toBe('Cancel');
    });

    it('should display a message with a custom text for the OK and Cancel buttons.', function() {
      apprise('Are you sure?', {'confirm': true, 'textOk': 'Yep', 'textCancel': 'Nope'});
      expect(message().text()).toBe('Are you sure?');
      expect(okButton().text()).toBe('Yep');
      expect(cancelButton().text()).toBe('Nope');
    });

    it('should return True when the OK button is clicked.', function() {
      apprise('Hello?', {'confirm': true}, callback);
      okButton().click();
      expect(callback).toHaveBeenCalledWith(true);
    });

    it('should return False when the Cancel button is clicked.', function() {
      apprise('Hello?', {'confirm': true}, callback);
      cancelButton().click();
      expect(callback).toHaveBeenCalledWith(false);
    });
  });


  describe('Verify', function() {
    it('should display a message and request verification', function() {
      apprise('Do you verify?', {'verify': true});
      expect(message().text()).toBe('Do you verify?');
      expect(okButton().text()).toBe('Yes');
      expect(cancelButton().text()).toBe('No');
    });

    it('should display a message with a custom text for the Yes and No buttons.', function() {
      apprise('Are you sure?', {'verify': true, 'textYes': 'Yes already!', 'textNo': 'Not yet'});
      expect(message().text()).toBe('Are you sure?');
      expect(okButton().text()).toBe('Yes already!');
      expect(cancelButton().text()).toBe('Not yet');
    });

    it('should return True when the Yes button is clicked.', function() {
      apprise('Hello?', {'verify': true}, callback);
      okButton().click();
      expect(callback).toHaveBeenCalledWith(true);
    });

    it('should return False when the No button is clicked.', function() {
      apprise('Hello?', {'verify': true}, callback);
      cancelButton().click();
      expect(callback).toHaveBeenCalledWith(false);
    });
  });


  describe('Input', function() {
    var textInput = _.bind($, this, '.aInput .aTextbox');

    it('should display a prompt', function() {
      apprise('What\'s your name?', {'input': true});
      expect(message().text()).toBe('What\'s your name?');
      expect(textInput().length).toBe(1);
      expect(textInput().val()).toBe('');
      expect(okButton().text()).toBe('OK');
      expect(cancelButton().text()).toBe('Cancel');
    });

    it('should display a prompt with initial value set and custom OK/Cancel buttons.', function() {
      apprise('Verify your name', {'input': 'Jack', 'textOk': 'Correct', 'textCancel': 'Abort'});
      expect(message().text()).toBe('Verify your name');
      expect(okButton().text()).toBe('Correct');
      expect(cancelButton().text()).toBe('Abort');
      expect(textInput().val()).toBe('Jack');
    });

    it('should return the an empty value when the OK button is clicked.', function() {
      apprise('Please enter your name:', {'input': true}, callback);
      okButton().click();
      expect(callback).toHaveBeenCalledWith('');
    });

    it('should return the entered value when the OK button is clicked.', function() {
      apprise('Please enter your name:', {'input': true}, callback);
      textInput().val('Joe');
      okButton().click();
      expect(callback).toHaveBeenCalledWith('Joe');
    });

    it('should return False when the Cancel button is clicked.', function() {
      apprise('Please enter your name:', {'input': true}, callback);
      textInput().val('Joe');
      cancelButton().click();
      expect(callback).toHaveBeenCalledWith(false);
    });
  });


  describe('Animation', function() {
    it('should display a message with sliding animation and default speed.', function() {
      spyOn(jQuery.fn, 'animate').andCallThrough();
      apprise('Hello', {animate: true});
      expect(jQuery.fn.animate.mostRecentCall.args).toEqual([{top:100}, 400]);
    });

    it('should display a message with sliding animation and custom speed.', function() {
      spyOn(jQuery.fn, 'animate').andCallThrough();
      apprise('Hello', {animate: 800});
      expect(jQuery.fn.animate.mostRecentCall.args).toEqual([{top:100}, 800]);
    });
  });
});
