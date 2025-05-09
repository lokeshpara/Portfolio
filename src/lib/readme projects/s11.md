# CIFAR-10 Image Classification with Custom ResNet Architecture

## 📋 Project Overview
This project demonstrates advanced deep learning capabilities through the implementation of a custom ResNet architecture for image classification on the CIFAR-10 dataset. The project showcases expertise in:

- **Deep Learning Architecture Design**: Custom ResNet implementation with innovative skip connections
- **Advanced Training Techniques**: Implementation of One Cycle Policy and dynamic learning rate scheduling
- **Modern Data Augmentation**: Integration of Albumentations library with custom augmentation pipeline
- **Model Optimization**: Achieving 92.22% test accuracy through careful architecture design and training strategies
- **Software Engineering Best Practices**: Modular code design, comprehensive testing, and performance optimization

The project serves as a testament to both technical expertise in deep learning and software engineering principles, making it a valuable portfolio piece for ML/AI roles.

## �� Key Achievements
- **92.22% Test Accuracy** on CIFAR-10 dataset, exceeding target by 2.22%
- **93.89% Training Accuracy** demonstrating model stability
- **Efficient Training**: Achieved target accuracy in just 24 epochs
- **State-of-the-Art Techniques**: Implemented modern deep learning practices

## 💡 Technical Highlights
- **Custom ResNet Architecture**: Designed and implemented a novel CNN architecture
- **Advanced Training Techniques**:
  - One Cycle Policy for optimal learning rate scheduling
  - Dynamic learning rate range finding
  - Batch normalization for stable training
- **Modern Data Augmentation**:
  - Implemented Albumentations library for advanced augmentations
  - Custom augmentation pipeline with CutOut, RandomCrop, and FlipLR
- **Model Interpretability**:
  - Comprehensive misclassification analysis
  - Class-wise performance tracking
  - Training/Testing metrics visualization

## 🛠️ Technical Stack & Skills
- **Deep Learning**: PyTorch, Custom CNN Architectures, ResNet
- **Computer Vision**: Image Classification, Data Augmentation
- **MLOps**: Training Pipeline, Model Evaluation, Performance Tracking
- **Software Engineering**:
  - Modular code design
  - Clean architecture
  - Comprehensive testing
  - Performance optimization

## 📊 Architecture Details

### Model Architecture
The model follows a custom ResNet-inspired architecture with the following components:

1. **PrepLayer**
   - Conv 3x3 (stride=1, padding=1) → BatchNorm → ReLU
   - Output channels: 64
   - Receptive Field: 3x3

2. **Layer 1**
   - Conv 3x3 (stride=1, padding=1) → MaxPool2D → BatchNorm → ReLU
   - Output channels: 128
   - Receptive Field: 6x6
   - ResBlock 1: (Conv-BN-ReLU-Conv-BN-ReLU)
   - Skip connection: Add(X, R1)

3. **Layer 2**
   - Conv 3x3 (stride=1, padding=1) → MaxPool2D → BatchNorm → ReLU
   - Output channels: 256
   - Receptive Field: 20x20

4. **Layer 3**
   - Conv 3x3 (stride=1, padding=1) → MaxPool2D → BatchNorm → ReLU
   - Output channels: 512
   - Receptive Field: 32x32
   - ResBlock 2: (Conv-BN-ReLU-Conv-BN-ReLU)
   - Skip connection: Add(X, R2)

5. **Final Layers**
   - MaxPooling with Kernel Size 4
   - Fully Connected Layer
   - SoftMax

### Training Configuration
- **Total Epochs**: 24
- **Max LR at Epoch**: 5
- **Batch Size**: 512
- **Learning Rate**: Dynamically determined using LR Range Test
- **Target Accuracy**: 90% (Achieved: 92.22%)

### Data Augmentation
The following transformations are applied during training:
1. RandomCrop 32x32 (after padding of 4)
2. Random Horizontal Flip
3. CutOut(8x8)
4. Normalization using CIFAR-10 statistics

## 🚀 Implementation Details

### Data Loading and Augmentation
- Uses both PyTorch transforms and Albumentations library
- Implements custom Albumentation class for advanced augmentations
- Separate transforms for training and testing

### Training Strategy
1. **One Cycle Policy**
   - Learning rate scheduling with dynamic range
   - No learning rate annihilation
   - Peak learning rate at epoch 5

2. **Optimization**
   - SGD optimizer with momentum
   - Weight decay for regularization
   - Batch normalization for stable training

### Model Components
The project includes multiple model implementations:
1. **Custom ResNet (A11.py)**
   - Main architecture used for achieving 92.22% accuracy
   - Implements skip connections and residual blocks

2. **Alternative Architectures**
   - Model7.py: Implements depthwise convolutions and dilated convolutions
   - ResNet.py: Standard ResNet18 implementation

### Training and Testing Utilities
1. **Training Module (train11.py)**
   - Implements training loop
   - Tracks training accuracy and losses
   - Progress tracking with tqdm

2. **Testing Module (test11.py)**
   - Comprehensive testing functionality
   - Tracks test losses and accuracy
   - Collects misclassified and correctly classified images
   - Class-wise performance analysis

3. **Learning Rate Finder (lr_range_test.py)**
   - Implements learning rate range test
   - Helps determine optimal learning rate range
   - Tracks accuracy and learning rate during test

## 📈 Results
- Best test accuracy: 92.22%
- Achieved in epoch 23
- Final learning rate: 0.004006
- Training accuracy at completion: 93.89%

## 📁 Project Structure
```
├── modules/
│   ├── dataloader11.py
│   ├── lr_range_test.py
│   ├── test11.py
│   ├── train11.py
│   └── models/
│       ├── A11.py
│       ├── model7.py
│       └── resnet.py
├── EVA_session11_assignment.ipynb
└── README.md
```

## 🛠️ Usage
1. Install required dependencies:
   ```bash
   pip install torch torchvision albumentations tqdm
   ```

2. Run the training:
   ```python
   from modules.models.A11 import Net
   from modules.dataloader11 import train_loader, test_loader
   from modules.train11 import train
   from modules.test11 import test
   
   # Initialize model and training
   model = Net()
   # ... training code ...
   ```

## 🔑 Key Features
- Custom ResNet architecture with skip connections
- Advanced data augmentation using Albumentations
- One Cycle Policy for learning rate scheduling
- Comprehensive training and testing utilities
- Model interpretability through misclassification analysis
- Class-wise performance tracking

## 🎯 Transferable Skills
- **Deep Learning**: Architecture design, optimization, and training
- **Computer Vision**: Image processing and classification
- **Software Engineering**: Clean code, modular design, testing
- **MLOps**: Training pipeline, model evaluation, performance tracking
- **Problem Solving**: Custom solutions for complex ML challenges
- **Performance Optimization**: Efficient training and inference
