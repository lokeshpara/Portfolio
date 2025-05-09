# MNIST Digit Recognition: A Deep Learning Journey

## Project Overview
This project demonstrates the iterative development of a Convolutional Neural Network (CNN) for MNIST digit recognition, achieving over 99.4% test accuracy through systematic architecture improvements and regularization techniques. The project showcases the application of various deep learning concepts and best practices.

## Technical Achievements
- Achieved 99.47% test accuracy on MNIST dataset
- Developed a lightweight model with only 9,980 parameters
- Implemented various deep learning best practices and optimizations
- Successfully balanced model capacity with regularization

## Detailed Implementation Journey

### Phase 1: Basic Architecture
**Target:**
- Established fundamental CNN architecture
- Implemented ReLU and BatchNorm in convolution layers
- Optimized model size
- Added strategic maxpooling at RF:5
- Integrated Global Average Pooling

**Technical Implementation:**
1. **Initial Architecture:**
   - Input: 28x28x1 (MNIST images)
   - Conv1: 3x3 kernel, 16 filters, ReLU, BatchNorm
   - Conv2: 3x3 kernel, 32 filters, ReLU, BatchNorm
   - Conv3: 1x1 kernel for dimensionality reduction
   - MaxPool: 2x2 kernel at RF:5
   - Conv4-6: 3x3 kernels with ReLU and BatchNorm
   - Conv7: Final convolution to 10 classes
   - GAP: Global Average Pooling

2. **Key Concepts Used:**
   - ReLU activation for non-linearity
   - BatchNorm for stable training
   - 1x1 convolutions for channel reduction
   - Global Average Pooling for parameter reduction
   - Receptive Field (RF) tracking

**Results:**
- Model size: 7,600 parameters
- Training accuracy: 99.13%
- Test accuracy: 99.07% (13th epoch)

**Analysis:**
- Identified overfitting at 19th epoch (99.33% train vs 99.04% test)
- Recognized need for regularization
- Model showed good initial performance but needed improvement

### Phase 2: Regularization Implementation
**Target:**
- Added dropout regularization
- Applied dropout to each layer

**Technical Implementation:**
1. **Architecture Modifications:**
   - Added Dropout2d(0.04) after each BatchNorm layer
   - Maintained same architecture but with regularization
   - Dropout applied to feature maps (2D dropout)

2. **Key Concepts Used:**
   - Dropout for regularization
   - Feature map dropout (Dropout2d)
   - Regularization strength tuning
   - Model capacity vs regularization balance

**Results:**
- Maintained model size: 7,600 parameters
- Training accuracy: 98.34%
- Test accuracy: 99.02% (14th epoch)

**Analysis:**
- Identified underfitting due to aggressive dropout
- Discovered opportunity to enhance model capacity after GAP
- Model showed better generalization but needed more capacity

### Phase 3: Model Capacity Enhancement
**Target:**
- Increased model capacity
- Added post-GAP layer

**Technical Implementation:**
1. **Architecture Modifications:**
   - Added 1x1 convolution after GAP
   - Increased channel dimensions in later layers
   - Maintained dropout but with adjusted architecture

2. **Key Concepts Used:**
   - Post-GAP feature refinement
   - Channel dimension optimization
   - Model capacity tuning
   - Feature map preservation

**Results:**
- Model size: 9,660 parameters
- Training accuracy: 98.84%
- Test accuracy: 99.39% (13th epoch)

**Analysis:**
- Achieved better generalization
- Identified potential for further capacity improvements
- Model showed more stable training

### Phase 4: Architecture Refinement
**Target:**
- Further increased model capacity

**Technical Implementation:**
1. **Architecture Modifications:**
   - Optimized channel dimensions
   - Fine-tuned layer configurations
   - Adjusted feature map sizes

2. **Key Concepts Used:**
   - Channel dimension optimization
   - Feature map size tuning
   - Architecture efficiency
   - Parameter optimization

**Results:**
- Model size: 9,980 parameters
- Training accuracy: 98.89%
- Test accuracy: 99.37% (15th epoch)

**Analysis:**
- Observed consistent high performance (99.47% and 99.45% at 17th and 19th epochs)
- Identified need for data augmentation
- Model showed good stability

### Phase 5: Data Augmentation
**Target:**
- Implemented RandomRotation for better generalization

**Technical Implementation:**
1. **Data Augmentation:**
   - Added RandomRotation transform
   - Rotation range: (-7.0, 7.0) degrees
   - Fill value: 1 (background)
   - Applied during training only

2. **Key Concepts Used:**
   - Data augmentation
   - Geometric transformations
   - Training set enrichment
   - Generalization improvement

**Results:**
- Maintained model size: 9,980 parameters
- Training accuracy: 98.67%
- Test accuracy: 99.47% (14th epoch)

**Analysis:**
- Achieved consistent 99.4%+ accuracy
- Demonstrated effectiveness of data augmentation
- Model showed excellent generalization

## Technical Implementation Details
- **Framework:** PyTorch
- **Architecture:** Custom CNN with:
  - Multiple convolution layers with ReLU and BatchNorm
  - Strategic maxpooling
  - Global Average Pooling
  - Dropout regularization
  - Data augmentation (RandomRotation)
- **Training:**
  - 20 epochs
  - Batch size: 128
  - Learning rate: 0.01
  - Momentum: 0.9
- **Optimizer:** SGD with momentum
- **Loss Function:** Cross Entropy Loss
- **Data Preprocessing:**
  - Normalization: mean=0.1307, std=0.3081
  - RandomRotation: (-7.0, 7.0) degrees
  - ToTensor transformation

## Key Technical Decisions
1. **BatchNorm Implementation:**
   - Applied after each ReLU
   - Helps in stable training
   - Reduces internal covariate shift

2. **Dropout Strategy:**
   - Used Dropout2d for spatial dropout
   - Rate: 0.04 (4% dropout)
   - Applied after BatchNorm layers

3. **1x1 Convolutions:**
   - Used for dimensionality reduction
   - Efficient parameter usage
   - Channel reduction without spatial information loss

4. **Global Average Pooling:**
   - Replaced fully connected layers
   - Reduced parameters significantly
   - Better generalization

5. **Data Augmentation:**
   - RandomRotation for better generalization
   - Helps model learn rotation invariance
   - Improves robustness

## Future Improvements
1. **Learning Rate Optimization:**
   - Implement learning rate scheduling
   - Try different learning rate ranges
   - Experiment with warm-up periods

2. **Optimization Algorithms:**
   - Test Adam optimizer
   - Try different momentum values
   - Experiment with weight decay

3. **Data Augmentation:**
   - Add more augmentation techniques
   - Try different rotation ranges
   - Implement elastic deformations

4. **Model Compression:**
   - Quantization techniques
   - Pruning strategies
   - Knowledge distillation

5. **Architecture Improvements:**
   - Experiment with residual connections
   - Try different activation functions
   - Implement attention mechanisms
