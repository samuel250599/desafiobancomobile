const BasePage = require('./base.page');
const Gestures = require('../utils/gestures');

/**
 * Swipe Page Object
 * Handles carousel swipe interactions
 */
class SwipePage extends BasePage {
  constructor() {
    super();
    // Tab selector
    this.swipeTab = '~tab-bar-option-swipe';
    this.swipeScreen = '~Swipe-screen';

    // Carousel elements
    this.carousel = '~Carousel';
    this.carouselCard = '~carousel-card';
    this.cardTitle = '~card-title';
    this.cardSubtitle = '~card-subtitle';

    // Alternative selectors
    this.swipeContainer = '//android.widget.TextView[@text="Swipe horizontal"]|//XCUIElementTypeStaticTensor[@name="Swipe horizontal"]';
    this.carouselCardAlt = '//android.view.ViewGroup[@content-desc="carousel-card"]|//XCUIElementTypeGroup[@name="carousel-card"]';

    // Swipe directions text
    this.horizontalSwipeText = '//android.widget.TextView[contains(@text, "Swipe")]|//XCUIElementTypeStaticTensor[contains(@name, "Swipe")]';
  }

  /**
   * Navigate to Swipe screen
   */
  async goToSwipe() {
    await this.clickElement(this.swipeTab);
    await this.waitForElement(this.swipeScreen);
  }

  /**
   * Swipe carousel left
   */
  async swipeCarouselLeft() {
    const element = await $(this.carousel);
    await Gestures.swipeLeft(element);
    await this.pause(500);
  }

  /**
   * Swipe carousel right
   */
  async swipeCarouselRight() {
    const element = await $(this.carousel);
    await Gestures.swipeRight(element);
    await this.pause(500);
  }

  /**
   * Get current card title
   */
  async getCurrentCardTitle() {
    try {
      return await this.getElementText(this.cardTitle);
    } catch {
      return null;
    }
  }

  /**
   * Get current card subtitle
   */
  async getCurrentCardSubtitle() {
    try {
      return await this.getElementText(this.cardSubtitle);
    } catch {
      return null;
    }
  }

  /**
   * Count carousel cards
   */
  async getCarouselCardsCount() {
    const cards = await $$(this.carouselCard);
    return cards.length;
  }

  /**
   * Swipe to specific card by index
   */
  async swipeToCard(targetIndex, maxSwipes = 10) {
    let currentIndex = 0;
    let swipes = 0;

    while (currentIndex < targetIndex && swipes < maxSwipes) {
      await this.swipeCarouselLeft();
      currentIndex++;
      swipes++;
    }
  }

  /**
   * Verify swipe is working by checking card change
   */
  async verifyCardChangesAfterSwipe() {
    const initialTitle = await this.getCurrentCardTitle();
    await this.swipeCarouselLeft();
    const newTitle = await this.getCurrentCardTitle();
    return initialTitle !== newTitle;
  }

  /**
   * Perform multiple swipes
   */
  async performMultipleSwipes(count) {
    for (let i = 0; i < count; i++) {
      await this.swipeCarouselLeft();
    }
  }

  /**
   * Check if carousel is visible
   */
  async isCarouselVisible() {
    return this.isElementDisplayed(this.carousel);
  }

  /**
   * Wait for swipe page to load
   */
  async waitForSwipePageToLoad() {
    await this.waitForElement(this.swipeTab);
    await this.clickElement(this.swipeTab);
    await this.waitForElement(this.carousel);
  }
}

module.exports = new SwipePage();