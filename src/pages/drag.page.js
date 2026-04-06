const BasePage = require('./base.page');
const Gestures = require('../utils/gestures');

/**
 * Drag Page Object
 * Handles drag and drop puzzle interactions
 */
class DragPage extends BasePage {
  constructor() {
    super();
    // Tab selector
    this.dragTab = '~tab-bar-option-drag';
    this.dragScreen = '~Drag-screen';

    // Puzzle elements
    this.dragContainer = '~Drag-drop';
    this.dropZone = '~drop-zone';
    this.draggableElement = '~drag';
    this.puzzlePiecePrefix = '~drag-l';

    // Status elements
    this.successMessage = '//android.widget.TextView[@text="Congratulations!"]|//XCUIElementTypeStaticTensor[@name="Congratulations!"]';
    this.retryButton = '~button-Retry';

    // Alternative selectors
    this.draggableElementAlt = '//android.view.ViewGroup[@content-desc="drag"]|//XCUIElementTypeGroup[@name="drag"]';
    this.dropZoneAlt = '//android.view.ViewGroup[@content-desc="drop-zone"]|//XCUIElementTypeGroup[@name="drop-zone"]';
  }

  /**
   * Navigate to Drag screen
   */
  async goToDrag() {
    await this.clickElement(this.dragTab);
    await this.waitForElement(this.dragScreen);
  }

  /**
   * Get all draggable puzzle pieces
   */
  async getDraggablePieces() {
    // Puzzle pieces are labeled drag-l0, drag-l1, drag-l2, drag-l3, drag-r0, etc.
    const pieces = [];
    const labels = ['l0', 'l1', 'l2', 'l3', 'r0', 'r1', 'r2', 'r3', 'c0', 'c1'];

    for (const label of labels) {
      const selector = `~drag-${label}`;
      if (await this.isElementExisting(selector)) {
        pieces.push(selector);
      }
    }
    return pieces;
  }

  /**
   * Drag element to position
   */
  async dragElementTo(sourceSelector, targetX, targetY) {
    const source = await $(sourceSelector);
    await Gestures.dragTo(source, targetX, targetY);
  }

  /**
   * Drag element by offset
   */
  async dragElementByOffset(sourceSelector, xOffset, yOffset) {
    const source = await $(sourceSelector);
    await Gestures.dragByOffset(source, xOffset, yOffset);
  }

  /**
   * Solve puzzle by dragging all pieces
   * Note: This is a simplified approach - actual puzzle requires matching
   */
  async solvePuzzle() {
    const pieces = await this.getDraggablePieces();

    for (const pieceSelector of pieces) {
      try {
        const piece = await $(pieceSelector);
        const location = await piece.getLocation();
        const size = await piece.getSize();

        // Drag to center of screen (simplified approach)
        const targetX = 500;
        const targetY = 500;

        await Gestures.dragTo(piece, targetX, targetY);
        await this.pause(300);
      } catch (error) {
        console.log(`Could not drag piece: ${pieceSelector}`);
      }
    }
  }

  /**
   * Check if puzzle is solved
   */
  async isPuzzleSolved() {
    await this.pause(1000);
    return this.isElementDisplayed(this.successMessage);
  }

  /**
   * Get success message
   */
  async getSuccessMessage() {
    if (await this.isElementDisplayed(this.successMessage)) {
      return this.getElementText(this.successMessage);
    }
    return null;
  }

  /**
   * Click retry button
   */
  async clickRetry() {
    if (await this.isElementDisplayed(this.retryButton)) {
      await this.clickElement(this.retryButton);
    }
  }

  /**
   * Drag specific puzzle piece by name
   */
  async dragPieceByName(pieceName, targetX, targetY) {
    const selector = `~drag-${pieceName}`;
    if (await this.isElementExisting(selector)) {
      const element = await $(selector);
      await Gestures.dragTo(element, targetX, targetY);
    }
  }

  /**
   * Perform drag gesture on piece
   */
  async performDragGesture(sourceSelector, xOffset, yOffset) {
    const source = await $(sourceSelector);
    await driver.touchPerform([
      { action: 'press', options: { element: source.elementId } },
      { action: 'wait', options: { ms: 500 } },
      { action: 'moveTo', options: { x: xOffset, y: yOffset } },
      { action: 'release' },
    ]);
  }

  /**
   * Wait for drag page to load
   */
  async waitForDragPageToLoad() {
    await this.waitForElement(this.dragTab);
    await this.clickElement(this.dragTab);
    await this.waitForElement(this.dragContainer);
  }
}

module.exports = new DragPage();